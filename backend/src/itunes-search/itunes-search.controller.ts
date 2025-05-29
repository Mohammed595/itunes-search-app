import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { SearchQueryDto } from './dto/search-query.dto';
import { ItunesSearchService } from './itunes-search.service';
import {
  SearchHistoryResponse,
  SearchResponse,
  iTunesEmptyResponse,
} from './types/api-response.types';

@Controller('api/itunes')
export class ItunesSearchController {
  constructor(private readonly itunesSearchService: ItunesSearchService) {}

  @Get('search')
  async searchByQuery(
    @Query(new ValidationPipe({ transform: true })) searchQuery: SearchQueryDto,
  ): Promise<SearchResponse | iTunesEmptyResponse> {
    return this.itunesSearchService.search(searchQuery);
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
