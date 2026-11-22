import { Film } from 'lucide-react';
import { useNowPlayingMovies } from '@/hooks/useTMDB';
import MediaSkeleton from '@/components/common/MediaSkeleton';
import ErrorCard from '@/components/common/ErrorCard';
import MovieCard from './MovieCard';

export default function LatestReleases() {
  const { data, isLoading, isError, error, refetch } = useNowPlayingMovies();

  return (
    <section id="latest-releases" className="py-14 border-b border-[#6D8795] bg-[#446879]" aria-labelledby="latest-releases-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header with Polished Alignment & Hierarchy */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-5 border-b border-[#6D8795]">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C4D2D9] uppercase tracking-wider">
              <Film className="h-3.5 w-3.5" />
              <span>THEATRICAL SCHEDULE // NOW PLAYING</span>
            </div>
            <h2 id="latest-releases-title" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Latest Movie Releases
            </h2>
          </div>
          <p className="text-xs text-[#C4D2D9] font-mono sm:text-right">
            {data?.isMockMode
              ? 'DEMONSTRATION SCHEDULE // RECENT THEATRICAL TITLES'
              : 'OFFICIAL THEATRICAL SCHEDULE // REGIONAL RELEASES'}
          </p>
        </div>

        {/* Responsive Grid Structure */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <MediaSkeleton key={i} aspectRatio="2/3" />
            ))}
          </div>
        ) : isError ? (
          <ErrorCard
            title="Failed to Load Latest Releases"
            message={error instanceof Error ? error.message : 'Unable to query now playing feed.'}
            onRetry={() => refetch()}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
            {(data?.items || []).slice(0, 5).map((movie) => (
              <MovieCard
                key={movie.id}
                item={movie}
                badgeLabel="THEATRICAL"
                badgeType="theatrical"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
