import { Trophy } from 'lucide-react';
import { useTopRated } from '@/hooks/useTMDB';
import MediaSkeleton from '@/components/common/MediaSkeleton';
import ErrorCard from '@/components/common/ErrorCard';
import MovieCard from './MovieCard';

export default function TopRatedSection() {
  const { data, isLoading, isError, error, refetch } = useTopRated();

  return (
    <section id="top-rated" className="py-12 border-b border-[#6D8795] bg-[#446879]" aria-labelledby="top-rated-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#6D8795]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C4D2D9] uppercase tracking-wider">
              <Trophy className="h-3.5 w-3.5" />
              <span>CINEMATIC HALL OF FAME // TIMELESS WORKS</span>
            </div>
            <h2 id="top-rated-title" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Top Rated Movies
            </h2>
          </div>
          <p className="text-xs text-[#C4D2D9] font-mono">
            HIGHEST SCORED MASTERPIECES ACROSS ARCHIVAL HISTORY
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <MediaSkeleton key={i} aspectRatio="2/3" />
            ))}
          </div>
        ) : isError ? (
          <ErrorCard
            title="Failed to Load Top Rated Films"
            message={error instanceof Error ? error.message : 'Unable to query top rated feed.'}
            onRetry={() => refetch()}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {(data?.items || []).slice(0, 3).map((movie) => (
              <MovieCard
                key={movie.id}
                item={movie}
                badgeLabel="MASTERPIECE"
                badgeType="upcoming"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
