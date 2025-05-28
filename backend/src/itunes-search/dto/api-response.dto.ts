import { SearchHistory } from '../entities/search-history.entity';

export class SearchResponseDto {
  success: boolean;
  data: SearchHistory | SearchHistory[];
  message: string;
  count?: number;
}

export class SearchHistoryResponseDto {
  success: boolean;
  data: string[];
  message: string;
}

export class ErrorResponseDto {
  statusCode: number;
  message: string;
  error?: string;
}
