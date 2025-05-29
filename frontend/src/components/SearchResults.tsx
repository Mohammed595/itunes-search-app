import { SearchResult } from '@/types/search';
import SearchResultCard from './SearchResultCard';

interface SearchResultsProps {
  results: SearchResult[];
  loading: boolean;
  hasSearched: boolean;
  searchTerm: string;
}

export default function SearchResults({ results, loading, hasSearched, searchTerm }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
             style={{ backgroundColor: 'var(--bg-card)' }}>
          <div className="w-8 h-8 border-3 border-t-transparent rounded-full animate-spin"
               style={{ borderColor: 'var(--accent)' }}></div>
        </div>
        <p className="text-xl font-medium" style={{ color: 'var(--text-secondary)' }}>
          Searching for amazing content...
        </p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl"
             style={{ backgroundColor: 'var(--bg-card)' }}>
          🎵
        </div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Discover Amazing Content
        </h2>
        <p className="text-xl max-w-md mx-auto leading-relaxed" 
           style={{ color: 'var(--text-secondary)' }}>
          Search for music, movies, podcasts, and more from the iTunes Store
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
          {['🎵 Music', '🎬 Movies', '🎧 Podcasts'].map((item, index) => (
            <div key={index} 
                 className="p-6 rounded-2xl border text-center"
                 style={{ 
                   backgroundColor: 'var(--bg-card)', 
                   borderColor: 'var(--border)' 
                 }}>
              <div className="text-2xl mb-2">{item.split(' ')[0]}</div>
              <div className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                {item.split(' ')[1]}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hasSearched && results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center text-3xl"
             style={{ backgroundColor: 'var(--bg-card)' }}>
          😔
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          No results found
        </h3>
        <p className="text-lg mb-1" style={{ color: 'var(--text-secondary)' }}>
          No results found for "{searchTerm}"
        </p>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          Try different keywords or check your spelling
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Search Results
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {results.length} result{results.length !== 1 ? 's' : ''} found for "{searchTerm}"
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl text-sm font-medium"
             style={{ 
               backgroundColor: 'rgba(0, 212, 255, 0.1)', 
               color: 'var(--accent)' 
             }}>
          {results.length} items
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {results.map((item, index) => (
          <SearchResultCard key={item.trackId || index} item={item} />
        ))}
      </div>
    </div>
  );
} 