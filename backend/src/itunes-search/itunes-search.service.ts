import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { SearchQueryDto } from './dto/search-query.dto';
import { SearchHistory } from './entities/search-history.entity';
import { SearchResult } from './entities/search-result.entity';
import {
  iTunesSearchResponse,
  iTunesSearchResult,
} from './interfaces/itunes-api.interface';
import { SearchHistoryItem } from './types/api-response.types';

@Injectable()
export class ItunesSearchService {
  private readonly logger = new Logger(ItunesSearchService.name);
  private readonly iTunesApiUrl = 'https://itunes.apple.com/search';
  private readonly apiTimeout = 10000;

  constructor(
    @InjectRepository(SearchResult)
    private readonly searchResultRepository: Repository<SearchResult>,
    @InjectRepository(SearchHistory)
    private readonly searchHistoryRepository: Repository<SearchHistory>,
  ) {}

  async search(searchQuery: SearchQueryDto): Promise<SearchHistory> {
    try {
      this.logger.log(`Searching iTunes API for: "${searchQuery.term}"`);

      const cachedResult = await this.searchHistoryRepository.findOne({
        where: { searchTerm: searchQuery.term },
        relations: ['results'],
      });
      const apiResponse = await this.fetchFromItunesApi(searchQuery);

      if (cachedResult) {
        this.logger.log(`Cache hit for: "${searchQuery.term}"`);
        const newResults = await this.updateCachedResults(
          searchQuery,
          apiResponse.results,
        );
        return newResults;
      }

      if (this.isEmptyResponse(apiResponse)) {
        this.logger.warn(`No results found for: "${searchQuery.term}"`);
        return this.createEmptySearchHistory(
          searchQuery.term,
          searchQuery.limit,
        );
      }

      const savedSearch = await this.persistSearchResults(
        searchQuery,
        apiResponse.results,
      );
      this.logger.log(
        `Saved ${savedSearch.results.length} results for: "${searchQuery.term}"`,
      );

      return savedSearch;
    } catch (error) {
      this.handleSearchError(error, searchQuery.term);
    }
  }

  async getSearchHistory(): Promise<SearchHistoryItem[]> {
    const searches = await this.searchHistoryRepository.find({
      order: { createdAt: 'DESC' },
    });

    return searches.map((search) => ({
      searchTerm: search.searchTerm,
      count: search.resultCount,
    }));
  }

  async getResultsBySearchTerm(searchTerm: string): Promise<SearchHistory[]> {
    return this.searchHistoryRepository.find({
      where: { searchTerm },
      relations: ['results'],
      order: { createdAt: 'DESC' },
    });
  }

  async getAllSearches(): Promise<SearchHistory[]> {
    return this.searchHistoryRepository.find({
      relations: ['results'],
      order: { createdAt: 'DESC' },
    });
  }

  async getSearchById(id: number): Promise<SearchHistory | null> {
    return this.searchHistoryRepository.findOne({
      where: { id },
      relations: ['results'],
    });
  }

  private async fetchFromItunesApi(
    query: SearchQueryDto,
  ): Promise<iTunesSearchResponse> {
    const params = {
      term: query.term,
      media: query.media,
      country: query.country,
      limit: query.limit,
    };

    const response = await axios.get<iTunesSearchResponse>(this.iTunesApiUrl, {
      params,
      timeout: this.apiTimeout,
    });

    return response.data;
  }

  private isEmptyResponse(response: iTunesSearchResponse): boolean {
    return !response.results || response.results.length === 0;
  }

  private createEmptySearchHistory(
    term: string,
    limit?: number,
  ): SearchHistory {
    const emptySearch = new SearchHistory();
    emptySearch.searchTerm = term;
    emptySearch.limit = limit ?? 50;
    emptySearch.resultCount = 0;
    emptySearch.results = [];
    return emptySearch;
  }

  private async persistSearchResults(
    query: SearchQueryDto,
    results: iTunesSearchResult[],
  ): Promise<SearchHistory> {
    const searchHistory = await this.createSearchHistoryRecord(query, 0);

    const searchResults = await this.saveSearchResults(
      results,
      searchHistory.id,
    );

    searchHistory.resultCount = searchResults.length;
    searchHistory.results = searchResults;

    await this.searchHistoryRepository.save(searchHistory);

    return searchHistory;
  }

  private async createSearchHistoryRecord(
    query: SearchQueryDto,
    resultCount: number,
  ): Promise<SearchHistory> {
    const history = new SearchHistory();
    history.searchTerm = query.term;
    history.limit = query.limit ?? 50;
    history.resultCount = resultCount;

    return this.searchHistoryRepository.save(history);
  }

  private async saveSearchResults(
    iTunesResults: iTunesSearchResult[],
    searchHistoryId: number,
  ): Promise<SearchResult[]> {
    const results: SearchResult[] = [];

    for (const item of iTunesResults) {
      try {
        const result = this.mapToSearchResult(item, searchHistoryId);
        if (result) {
          const saved = await this.searchResultRepository.save(result);
          results.push(saved);
        }
      } catch (error) {
        this.logResultSaveError(error, item.trackId);
      }
    }

    return results;
  }

  private mapToSearchResult(
    item: iTunesSearchResult,
    searchHistoryId: number,
  ): SearchResult | null {
    if (!item.trackId) {
      this.logger.debug(
        `Skipping result without trackId: ${item.wrapperType} - ${item.collectionName || 'Unknown'}`,
      );
      return null;
    }

    const result = new SearchResult();

    result.searchHistoryId = searchHistoryId;
    result.trackId = item.trackId;

    result.wrapperType = item.wrapperType || '';
    result.kind = item.kind || '';
    result.artistName = item.artistName || '';
    result.collectionName = item.collectionName || '';
    result.trackName = item.trackName || '';

    result.collectionViewUrl = item.collectionViewUrl || '';
    result.trackViewUrl = item.trackViewUrl || '';

    result.artworkUrl30 = item.artworkUrl30 || '';
    result.artworkUrl60 = item.artworkUrl60 || '';
    result.artworkUrl100 = item.artworkUrl100 || '';

    result.collectionPrice = item.collectionPrice || 0;
    result.trackPrice = item.trackPrice || 0;
    result.releaseDate = item.releaseDate
      ? new Date(item.releaseDate)
      : new Date();

    result.collectionExplicitness = item.collectionExplicitness || '';
    result.trackExplicitness = item.trackExplicitness || '';

    result.trackCount = item.trackCount || 0;
    result.country = item.country || '';
    result.currency = item.currency || '';
    result.primaryGenreName = item.primaryGenreName || '';
    result.longDescription = item.longDescription || '';

    return result;
  }

  async updateCachedResults(
    searchQuery: SearchQueryDto,
    newResults: iTunesSearchResult[],
  ): Promise<SearchHistory> {
    const cachedResult = await this.searchHistoryRepository.findOne({
      where: { searchTerm: searchQuery.term },
      relations: ['results'],
    });

    if (!cachedResult) {
      throw new Error(`No cached result found for term: "${searchQuery.term}"`);
    }

    await this.searchResultRepository.delete({
      searchHistoryId: cachedResult.id,
    });

    const savedResults = await this.saveSearchResults(
      newResults,
      cachedResult.id,
    );

    cachedResult.resultCount = savedResults.length;
    cachedResult.results = savedResults;
    cachedResult.limit = searchQuery.limit ?? 50;
    cachedResult.updatedAt = new Date();

    return this.searchHistoryRepository.save(cachedResult);
  }

  private handleSearchError(error: unknown, searchTerm: string): never {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : undefined;

    this.logger.error(
      `iTunes API search failed for "${searchTerm}": ${message}`,
      stack,
    );
    throw new Error(`iTunes search failed: ${message}`);
  }

  private logResultSaveError(error: unknown, trackId?: number): void {
    const message = error instanceof Error ? error.message : 'Unknown error';
    this.logger.error(
      `Failed to save result (trackId: ${trackId}): ${message}`,
    );
  }
}
