import { Clock } from 'lucide-react';
import { useUpcomingMovies } from '@/hooks/useTMDB';
import MediaSkeleton from '@/components/common/MediaSkeleton';
import ErrorCard from '@/components/common/ErrorCard';
import MovieCard from './MovieCard';

export default function ComingSoon() {
  const { data, isLoading, isError, error, refetch } = useUpcomingMovies();

  return (
    <section id="coming-soon" className="py-12 border-b border-[#6D8795] bg-[#385665]" aria-labelledby="coming-soon-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-5 border-b border-[#6D8795]">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C4D2D9] uppercase tracking-wider">
              <Clock className="h-3.5 w-3.5" />
              <span>UPCOMING PREMIERES // RADAR PREVIEW</span>
            </div>
            <h2 id="coming-soon-title" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Coming Soon
            </h2>
          </div>
          <p className="text-xs text-[#C4D2D9] font-mono sm:text-right">
            {data?.isMockMode
              ? 'DEMONSTRATION TIMELINE // CONFIRMED UPCOMING DATES'
              : 'OFFICIAL SCHEDULE // THEATRICAL & DIGITAL DROPS'}
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <MediaSkeleton key={i} aspectRatio="2/3" />
            ))}
          </div>
        ) : isError ? (
          <ErrorCard
            title="Failed to Load Upcoming Releases"
            message={error instanceof Error ? error.message : 'Unable to query upcoming feed.'}
            onRetry={() => refetch()}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {(data?.items || []).slice(0, 4).map((movie, idx) => (
              <MovieCard
                key={movie.id}
                item={movie}
                badgeLabel="PREMIERE"
                badgeType="upcoming"
                countdownDays={(idx + 1) * 12}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
