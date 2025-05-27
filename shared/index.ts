// iTunes API Response Types
export interface ITunesSearchResult {
  wrapperType: string;
  kind: string;
  trackId?: number;
  artistName: string;
  trackName?: string;
  collectionName?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  releaseDate?: string;
  primaryGenreName?: string;
  trackTimeMillis?: number;
  country?: string;
  currency?: string;
  trackPrice?: number;
}

export interface ITunesSearchResponse {
  resultCount: number;
  results: ITunesSearchResult[];
}

// Search Parameters
export interface SearchParams {
  term: string;
  media?: 'music' | 'movie' | 'podcast' | 'ebook' | 'all';
  entity?: string;
  limit?: number;
  country?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
} 