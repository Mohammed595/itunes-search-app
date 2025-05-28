import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { MediaType, SearchQueryDto } from './dto/search-query.dto';
import { ItunesSearchService } from './itunes-search.service';
import {
  SearchHistoryResponse,
  SearchResponse,
  iTunesEmptyResponse,
} from './types/api-response.types';

@Controller('api/itunes')
export class ItunesSearchController {
  constructor(private readonly itunesSearchService: ItunesSearchService) {}

  @Post('search')
  async search(
    @Body() searchQuery: SearchQueryDto,
  ): Promise<SearchResponse | iTunesEmptyResponse> {
    try {
      if (!searchQuery.term || searchQuery.term.trim() === '') {
        throw new HttpException(
          'Search term is required',
          HttpStatus.BAD_REQUEST,
        );
      }

      searchQuery.media = searchQuery.media || MediaType.ALL;
      searchQuery.country = searchQuery.country || 'SA';
      searchQuery.limit = searchQuery.limit || 50;

      if (searchQuery.limit < 1 || searchQuery.limit > 200) {
        throw new HttpException(
          'Limit must be between 1 and 200',
          HttpStatus.BAD_REQUEST,
        );
      }

      const searchHistory = await this.itunesSearchService.search(searchQuery);

      if (searchHistory.resultCount === 0) {
        return {
          resultCount: 0,
          results: [],
        };
      }

      return {
        success: true,
        data: searchHistory,
        message: `Found ${searchHistory.resultCount} results for "${searchQuery.term}"`,
        count: searchHistory.resultCount,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Somthing went wrong';
      throw new HttpException(
        `Search failed: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search')
  async searchByQuery(
    @Query('term') term: string,
    @Query('media') media?: string,
    @Query('country') country?: string,
    @Query('limit') limit?: string,
  ): Promise<SearchResponse | iTunesEmptyResponse> {
    const searchQuery: SearchQueryDto = {
      term,
      media: (media as MediaType) || MediaType.ALL,
      country: country || '',
      limit: limit ? parseInt(limit, 10) : 50,
    };

    return this.search(searchQuery);
  }

  @Get('history')
  async getSearchHistory(): Promise<SearchHistoryResponse> {
    try {
      const history = await this.itunesSearchService.getSearchHistory();

      return {
        success: true,
        data: history,
        message: `Found ${history.length} search terms in history`,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to get search history: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('searches')
  async getAllSearches(): Promise<SearchResponse> {
    try {
      const searches = await this.itunesSearchService.getAllSearches();

      return {
        success: true,
        data: searches,
        message: `Found ${searches.length} searches with all results`,
        count: searches.length,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to get searches: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('search/:id')
  async getSearchById(@Param('id') id: string): Promise<SearchResponse> {
    try {
      const searchId = parseInt(id, 10);
      if (isNaN(searchId)) {
        throw new HttpException('Invalid search ID', HttpStatus.BAD_REQUEST);
      }

      const search = await this.itunesSearchService.getSearchById(searchId);

      if (!search) {
        throw new HttpException('Search not found', HttpStatus.NOT_FOUND);
      }

      return {
        success: true,
        data: search,
        message: `Found search with ${search.resultCount} results`,
        count: search.resultCount,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to get search: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('results/:searchTerm')
  async getResultsBySearchTerm(
    @Param('searchTerm') searchTerm: string,
  ): Promise<SearchResponse> {
    try {
      const searches =
        await this.itunesSearchService.getResultsBySearchTerm(searchTerm);

      const totalResults = searches.reduce(
        (sum, search) => sum + search.resultCount,
        0,
      );

      return {
        success: true,
        data: searches,
        message: `Found ${searches.length} searches with total ${totalResults} results for "${searchTerm}"`,
        count: searches.length,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to get results: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
