import { SearchResponse } from '@/types/search';

export class SearchService {
  private static readonly BASE_URL = process.env.BASE_URL;

  static async search(term: string, limit: number = 20): Promise<SearchResponse> {
    try {
      const url = `${this.BASE_URL}/api/itunes/search?term=${encodeURIComponent(term)}&limit=${limit}`;
      console.log('🔍 Searching with URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 API Response:', data);
      
      return data;
    } catch (error) {
      console.error('❌ Search API error:', error);
      throw new Error('Failed to search. Please try again.');
    }
  }
} 