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

  constructor(
    @InjectRepository(SearchResult)
    private readonly searchResultRepository: Repository<SearchResult>,
    @InjectRepository(SearchHistory)
    private readonly searchHistoryRepository: Repository<SearchHistory>,
  ) {}

  async search(searchQuery: SearchQueryDto): Promise<SearchHistory> {
    try {
      this.logger.log(`Searching iTunes API for term: ${searchQuery.term}`);

      const existingSearch = await this.searchHistoryRepository.findOne({
        where: {
          searchTerm: searchQuery.term,
        },
        relations: ['results'],
      });

      if (existingSearch) {
        this.logger.log(`Found existing search for term: ${searchQuery.term}`);
        return existingSearch;
      }

      const iTunesResponse = await this.searchItunesApi(searchQuery);

      if (!iTunesResponse.results || iTunesResponse.results.length === 0) {
        this.logger.warn(`No results found for term: ${searchQuery.term}`);

        const emptySearchHistory = new SearchHistory();
        emptySearchHistory.searchTerm = searchQuery.term;
        emptySearchHistory.limit = searchQuery.limit || 50;
        emptySearchHistory.resultCount = 0;
        emptySearchHistory.results = [];

        return emptySearchHistory;
      }

      const savedSearch = await this.saveSearchWithResults(
        searchQuery,
        iTunesResponse.results,
      );

      this.logger.log(
        `Successfully saved search with ${savedSearch.results.length} results for term: ${searchQuery.term}`,
      );

      return savedSearch;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Error searching iTunes API: ${errorMessage}`,
        errorStack,
      );
      throw new Error(`Failed to search iTunes API: ${errorMessage}`);
    }
  }

  private async searchItunesApi(
    searchQuery: SearchQueryDto,
  ): Promise<iTunesSearchResponse> {
    const params = {
      term: searchQuery.term,
      media: searchQuery.media,
      country: searchQuery.country,
      limit: searchQuery.limit,
    };

    const response = await axios.get<iTunesSearchResponse>(this.iTunesApiUrl, {
      params,
      timeout: 10000,
    });

    return response.data;
  }

  private async saveSearchWithResults(
    searchQuery: SearchQueryDto,
    iTunesResults: iTunesSearchResult[],
  ): Promise<SearchHistory> {
    const searchHistory = new SearchHistory();
    searchHistory.searchTerm = searchQuery.term;
    searchHistory.limit = searchQuery.limit || 50;
    searchHistory.resultCount = iTunesResults.length;

    const savedSearchHistory =
      await this.searchHistoryRepository.save(searchHistory);

    const searchResults: SearchResult[] = [];

    for (const iTunesResult of iTunesResults) {
      try {
        const searchResult = new SearchResult();
        searchResult.searchHistoryId = savedSearchHistory.id;
        searchResult.wrapperType = iTunesResult.wrapperType || '';
        searchResult.kind = iTunesResult.kind || '';
        searchResult.trackId = iTunesResult.trackId;
        searchResult.artistName = iTunesResult.artistName || '';
        searchResult.collectionName = iTunesResult.collectionName || '';
        searchResult.trackName = iTunesResult.trackName || '';
        searchResult.collectionViewUrl = iTunesResult.collectionViewUrl || '';
        searchResult.trackViewUrl = iTunesResult.trackViewUrl || '';
        searchResult.artworkUrl30 = iTunesResult.artworkUrl30 || '';
        searchResult.artworkUrl60 = iTunesResult.artworkUrl60 || '';
        searchResult.artworkUrl100 = iTunesResult.artworkUrl100 || '';
        searchResult.collectionPrice = iTunesResult.collectionPrice || 0;
        searchResult.trackPrice = iTunesResult.trackPrice || 0;
        searchResult.releaseDate = iTunesResult.releaseDate
          ? new Date(iTunesResult.releaseDate)
          : new Date();
        searchResult.collectionExplicitness =
          iTunesResult.collectionExplicitness || '';
        searchResult.trackExplicitness = iTunesResult.trackExplicitness || '';
        searchResult.trackCount = iTunesResult.trackCount || 0;
        searchResult.country = iTunesResult.country || '';
        searchResult.currency = iTunesResult.currency || '';
        searchResult.primaryGenreName = iTunesResult.primaryGenreName || '';
        searchResult.longDescription = iTunesResult.longDescription || '';

        const savedResult =
          await this.searchResultRepository.save(searchResult);
        searchResults.push(savedResult);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        this.logger.error(
          `Error saving result with trackId ${iTunesResult.trackId}: ${errorMessage}`,
        );
      }
    }

    savedSearchHistory.results = searchResults;
    return savedSearchHistory;
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
}
