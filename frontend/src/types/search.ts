export interface SearchResult {
  trackId?: number;
  artistName: string;
  trackName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  artworkUrl60?: string;
  artworkUrl30?: string;
  previewUrl?: string;
  trackViewUrl?: string;
  collectionViewUrl?: string;
  primaryGenreName?: string;
  releaseDate?: string;
  kind: string;
  wrapperType?: string;
  country?: string;
  currency?: string;
  trackPrice?: number;
  collectionPrice?: number;
}

export interface ITunesApiResponse {
  resultCount: number;
  results: SearchResult[];
}

export interface SearchResponse {
  success: boolean;
  data: ITunesApiResponse;
  message?: string;
  count?: number;
} 