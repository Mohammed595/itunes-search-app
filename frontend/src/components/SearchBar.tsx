interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function SearchBar({ searchTerm, onSearchChange, onSubmit, loading }: SearchBarProps) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5" style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for music, movies, podcasts..."
          className="w-full pl-11 pr-32 py-4 rounded-2xl border-2 text-lg font-medium transition-all duration-200 focus:outline-none focus:ring-4"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border)',
            color: 'var(--text-primary)',
          }}
          onFocus={(e) => {
            (e.target as HTMLElement).style.borderColor = 'var(--accent)';
            (e.target as HTMLElement).style.boxShadow = '0 0 0 4px rgba(0, 212, 255, 0.1)';
          }}
          onBlur={(e) => {
            (e.target as HTMLElement).style.borderColor = 'var(--border)';
            (e.target as HTMLElement).style.boxShadow = 'none';
          }}
        />
        <button
          type="submit"
          disabled={loading || !searchTerm.trim()}
          className="absolute right-2 top-2 bottom-2 px-6 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--accent)',
            color: '#000',
          }}
          onMouseEnter={(e) => {
            if (!loading && searchTerm.trim()) {
              (e.target as HTMLElement).style.transform = 'scale(1.05)';
              (e.target as HTMLElement).style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1)';
            (e.target as HTMLElement).style.boxShadow = 'none';
          }}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              <span>Searching...</span>
            </div>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </form>
  );
} 