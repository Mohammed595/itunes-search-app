import { SearchService } from '@/services/searchService';
import { SearchResult } from '@/types/search';
import { useState } from 'react';

export function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setError(null);

    try {
      const response = await SearchService.search(term, 20);
      const res = response as any;
      
      console.log('🎯 Full response:', res);
      console.log('🎯 Response type:', typeof res);
      console.log('🎯 Response keys:', Object.keys(res));
      
      if (res.success !== undefined) {
        console.log('✅ Has success property:', res.success);
      }
      
      if (res.data) {
        console.log('📊 Data exists:', res.data);
        console.log('📊 Data type:', typeof res.data);
        console.log('📊 Data keys:', Object.keys(res.data));
        
        if (res.data.results) {
          console.log('🎵 Results array:', res.data.results);
          console.log('🎵 Results length:', res.data.results.length);
          console.log('🎵 First result:', res.data.results[0]);
        }
      }
      
      let extractedResults: SearchResult[] = [];
      
      if (res.success && res.data && res.data.results) {
        extractedResults = res.data.results;
        console.log('📍 Method 1: success + data.results');
      } else if (res.data && res.data.results) {
        extractedResults = res.data.results;
        console.log('📍 Method 2: data.results');
      } else if (res.results) {
        extractedResults = res.results;
        console.log('📍 Method 3: direct results');
      } else if (Array.isArray(res)) {
        extractedResults = res;
        console.log('📍 Method 4: response is array');
      }
      
      console.log('🎯 Final extracted results:', extractedResults);
      console.log('🎯 Final results length:', extractedResults.length);
      
      setResults(extractedResults);
      
      if (extractedResults.length === 0) {
        setError('No results found');
      }
      
    } catch (err) {
      console.error('💥 Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await search(searchTerm);
  };

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
    setError(null);
  };

  return {
    searchTerm,
    results,
    loading,
    hasSearched,
    error,
    updateSearchTerm,
    handleSearch,
  };
} 