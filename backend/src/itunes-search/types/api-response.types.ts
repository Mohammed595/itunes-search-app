import { SearchHistory } from '../entities/search-history.entity';
import { SearchResult } from '../entities/search-result.entity';

export interface BaseApiResponse {
  success: boolean;
  message: string;
}

export interface SearchHistoryItem {
  searchTerm: string;
  count: number;
}

export interface SearchResponse extends BaseApiResponse {
  data: SearchHistory | SearchHistory[] | SearchResult[];
  count: number;
}

export interface SearchHistoryResponse extends BaseApiResponse {
  data: SearchHistoryItem[];
}

// iTunes API-style response for empty results
export interface iTunesEmptyResponse {
  resultCount: number;
  results: any[];
}

export interface QueryParams {
  term: string;
  media?: string;
  country?: string;
  limit?: string;
}
