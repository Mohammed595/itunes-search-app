'use client';

import { useState } from 'react';

interface SearchResult {
  trackId?: number;
  artistName: string;
  trackName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  trackViewUrl?: string;
  primaryGenreName?: string;
  releaseDate?: string;
  kind: string;
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/search?term=${encodeURIComponent(searchTerm)}&limit=20`);
      const data = await response.json();
      
      if (data.success) {
        setResults(data.data.results || []);
      } else {
        console.error('Search failed:', data.message);
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">iTunes Search</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for music, movies, podcasts..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Searching...</p>
          </div>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No results found for "{searchTerm}"</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">{results.length} results found</p>
            {results.map((item, index) => (
              <div key={item.trackId || index} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  {/* Artwork */}
                  {item.artworkUrl100 && (
                    <img
                      src={item.artworkUrl100}
                      alt={item.trackName || item.collectionName || 'Artwork'}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {item.trackName || item.collectionName || 'Unknown Title'}
                    </h3>
                    <p className="text-gray-600 truncate">{item.artistName}</p>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">{item.kind}</span>
                      {item.primaryGenreName && (
                        <span className="bg-blue-100 px-2 py-1 rounded text-blue-700">
                          {item.primaryGenreName}
                        </span>
                      )}
                      {item.releaseDate && (
                        <span>{new Date(item.releaseDate).getFullYear()}</span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-3">
                      {item.previewUrl && (
                        <a
                          href={item.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Preview
                        </a>
                      )}
                      {item.trackViewUrl && (
                        <a
                          href={item.trackViewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View in iTunes
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎵</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Search iTunes Store</h2>
            <p className="text-gray-500">Find music, movies, podcasts, and more</p>
          </div>
        )}
      </div>
    </div>
  );
}
