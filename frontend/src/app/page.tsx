'use client';

import SearchBar from '@/components/SearchBar';
import SearchResults from '@/components/SearchResults';
import { useSearch } from '@/hooks/useSearch';

export default function Home() {
  const {
    searchTerm,
    results,
    loading,
    hasSearched,
    error,
    updateSearchTerm,
    handleSearch,
  } = useSearch();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <header className="sticky top-0 z-50 backdrop-blur-md border-b" 
              style={{ 
                backgroundColor: 'rgba(15, 20, 25, 0.8)', 
                borderColor: 'var(--border)' 
              }}>
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">🎵</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              iTunes Search
            </h1>
          </div>
          
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={updateSearchTerm}
            onSubmit={handleSearch}
            loading={loading}
          />

          {error && (
            <div className="mt-4 p-4 rounded-xl border" 
                 style={{ 
                   backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                   borderColor: '#ef4444',
                   color: '#fca5a5' 
                 }}>
              <div className="flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <SearchResults
          results={results}
          loading={loading}
          hasSearched={hasSearched}
          searchTerm={searchTerm}
        />
      </main>
    </div>
  );
}
