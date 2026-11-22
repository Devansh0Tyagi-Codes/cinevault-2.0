import { Tv } from 'lucide-react';
import { usePopularSeries } from '@/hooks/useTMDB';
import MediaSkeleton from '@/components/common/MediaSkeleton';
import ErrorCard from '@/components/common/ErrorCard';
import MovieCard from './MovieCard';

export default function PopularSeries() {
  const { data, isLoading, isError, error, refetch } = usePopularSeries();

  return (
    <section id="series" className="py-12 border-b border-[#6D8795] bg-[#385665]" aria-labelledby="popular-tv-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-[#6D8795]">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#C4D2D9] uppercase tracking-wider">
              <Tv className="h-3.5 w-3.5" />
              <span>EPISODIC TELEVISION // ACCLAIMED SERIES</span>
            </div>
            <h2 id="popular-tv-title" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Popular TV Shows
            </h2>
          </div>
          <p className="text-xs text-[#C4D2D9] font-mono">
            CRITICALLY CELEBRATED LONG-FORM STORYTELLING
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
            title="Failed to Load Series"
            message={error instanceof Error ? error.message : 'Unable to query TV feed.'}
            onRetry={() => refetch()}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {(data?.items || []).slice(0, 3).map((show) => (
              <MovieCard
                key={show.id}
                item={show}
                badgeLabel="SERIES"
                badgeType="ott"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
