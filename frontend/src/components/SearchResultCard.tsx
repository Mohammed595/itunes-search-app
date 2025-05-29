import { SearchResult } from '@/types/search';

interface SearchResultCardProps {
  item: SearchResult;
}

export default function SearchResultCard({ item }: SearchResultCardProps) {
  return (
    <div 
      className="group rounded-2xl p-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer border"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.1)';
        e.currentTarget.style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = 'var(--border)';
      }}
    >
      <div className="flex gap-4">
        {/* Artwork */}
        <div className="flex-shrink-0">
          {item.artworkUrl100 ? (
            <img
              src={item.artworkUrl100}
              alt={item.trackName || item.collectionName || 'Artwork'}
              className="w-20 h-20 rounded-xl object-cover shadow-lg"
            />
          ) : (
            <div 
              className="w-20 h-20 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              🎵
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 
            className="font-bold text-lg mb-1 truncate group-hover:text-white transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            {item.trackName || item.collectionName || 'Unknown Title'}
          </h3>
          <p 
            className="text-base mb-3 truncate"
            style={{ color: 'var(--text-secondary)' }}
          >
            {item.artistName}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span 
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ 
                backgroundColor: 'rgba(0, 212, 255, 0.1)', 
                color: 'var(--accent)' 
              }}
            >
              {item.kind}
            </span>
            {item.primaryGenreName && (
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  color: 'var(--text-secondary)' 
                }}
              >
                {item.primaryGenreName}
              </span>
            )}
            {item.releaseDate && (
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                  color: '#22c55e' 
                }}
              >
                {new Date(item.releaseDate).getFullYear()}
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            {item.previewUrl && (
              <a
                href={item.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
                style={{ 
                  backgroundColor: 'var(--accent)', 
                  color: '#000' 
                }}
              >
                <span>🎧</span>
                <span>Preview</span>
              </a>
            )}
            {item.trackViewUrl && (
              <a
                href={item.trackViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 border"
                style={{ 
                  borderColor: 'var(--border)', 
                  color: 'var(--text-secondary)' 
                }}
              >
                <span>🍎</span>
                <span>iTunes</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 