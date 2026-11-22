import { TrendingUp } from 'lucide-react';
import { useTrendingMovies } from '@/hooks/useTMDB';
import MediaSkeleton from '@/components/common/MediaSkeleton';
import ErrorCard from '@/components/common/ErrorCard';
import MovieCard from './MovieCard';

export default function TrendingMovies() {
  const { data, isLoading, isError, error, refetch } = useTrendingMovies('week');

  return (
    <section id="trending" className="py-12 border-b border-[#6D8795] bg-[#446879]" aria-labelledby="trending-movies-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#6D8795]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C4D2D9] uppercase tracking-wider">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>GLOBAL AUDIENCES // WEEKLY PULSE</span>
            </div>
            <h2 id="trending-movies-title" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Trending Movies
            </h2>
          </div>
          <p className="text-xs text-[#C4D2D9] font-mono">
            TOP STREAMING &amp; BOX-OFFICE INTEREST
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <MediaSkeleton key={i} aspectRatio="2/3" />
            ))}
          </div>
        ) : isError ? (
          <ErrorCard
            title="Failed to Load Trending Movies"
            message={error instanceof Error ? error.message : 'Unable to query trending feed.'}
            onRetry={() => refetch()}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
            {(data?.items || []).slice(0, 6).map((movie, idx) => (
              <MovieCard
                key={movie.id}
                item={movie}
                rank={idx + 1}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
