import { useState } from 'react';
import { Star, Compass } from 'lucide-react';
import { useDiscoveryFeed } from '@/hooks/useTMDB';
import { DiscoveryTab } from '@/types/media';
import MediaSkeleton from '@/components/common/MediaSkeleton';
import ErrorCard from '@/components/common/ErrorCard';

const GENRE_FILTERS = [
  { id: undefined, label: 'All Categories' },
  { id: 18, label: 'Drama' },
  { id: 878, label: 'Sci-Fi' },
  { id: 80, label: 'Crime' },
  { id: 28, label: 'Action' },
  { id: 35, label: 'Comedy' },
  { id: 53, label: 'Thriller' },
  { id: 36, label: 'History' },
];

export default function DiscoveryFeed() {
  const [activeTab, setActiveTab] = useState<DiscoveryTab>('trending_movies');
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(undefined);

  const { data, isLoading, isError, error, refetch } = useDiscoveryFeed(
    activeTab,
    selectedGenreId
  );

  const items = data?.items || [];

  return (
    <section className="py-14 border-b border-paper-rule" aria-labelledby="discovery-feed-title" id="discover">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-paper-rule mb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[11px] font-mono tracking-wider text-ink-caption uppercase mb-1">
              <Compass className="h-3.5 w-3.5 text-accent-warm" />
              <span>THE CURATED ARCHIVE // GLOBAL DISCOVERY</span>
            </div>
            <h2 id="discovery-feed-title" className="font-serif text-2xl sm:text-3xl font-semibold text-ink-primary tracking-tight">
              The Vault Discovery
            </h2>
          </div>

          {/* Primary Discovery Tabs */}
          <div className="flex items-center space-x-1 border border-paper-rule rounded-sm bg-paper-surface p-1 text-xs font-mono">
            <button
              onClick={() => {
                setActiveTab('trending_movies');
                setSelectedGenreId(undefined);
              }}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'trending_movies'
                  ? 'bg-paper-canvas text-accent-warm font-bold shadow-sm'
                  : 'text-ink-caption hover:text-ink-primary'
              }`}
              aria-pressed={activeTab === 'trending_movies'}
            >
              TRENDING MOVIES
            </button>
            <button
              onClick={() => {
                setActiveTab('popular_tv');
                setSelectedGenreId(undefined);
              }}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'popular_tv'
                  ? 'bg-paper-canvas text-accent-warm font-bold shadow-sm'
                  : 'text-ink-caption hover:text-ink-primary'
              }`}
              aria-pressed={activeTab === 'popular_tv'}
            >
              POPULAR SERIES
            </button>
            <button
              onClick={() => {
                setActiveTab('top_rated');
                setSelectedGenreId(undefined);
              }}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer ${
                activeTab === 'top_rated'
                  ? 'bg-paper-canvas text-accent-warm font-bold shadow-sm'
                  : 'text-ink-caption hover:text-ink-primary'
              }`}
              aria-pressed={activeTab === 'top_rated'}
            >
              CRITICALLY ACCLAIMED
            </button>
          </div>
        </div>

        {/* Secondary Genre Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 text-xs font-mono scrollbar-none">
          <span className="text-ink-caption tracking-wider uppercase shrink-0 mr-1 text-[11px]">
            FILTER BY GENRE:
          </span>
          {GENRE_FILTERS.map((genre) => (
            <button
              key={genre.label}
              onClick={() => setSelectedGenreId(genre.id)}
              className={`px-3 py-1 rounded-sm border transition-colors shrink-0 cursor-pointer ${
                selectedGenreId === genre.id
                  ? 'bg-accent-warm text-white border-accent-warm font-medium'
                  : 'bg-paper-surface hover:bg-paper-highlight text-ink-muted hover:text-ink-primary border-paper-rule'
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MediaSkeleton aspectRatio="3/4" />
            <MediaSkeleton aspectRatio="3/4" />
            <MediaSkeleton aspectRatio="3/4" />
            <MediaSkeleton aspectRatio="3/4" />
          </div>
        )}

        {/* Error State */}
        {isError && (
          <ErrorCard
            title="Discovery Feed Unavailable"
            message={error instanceof Error ? error.message : 'Failed to query discovery items.'}
            onRetry={() => refetch()}
          />
        )}

        {/* Empty State */}
        {!isLoading && !isError && items.length === 0 && (
          <div className="p-8 text-center rounded-sm bg-paper-surface border border-paper-rule space-y-2">
            <h4 className="font-serif text-lg font-semibold text-ink-primary">
              No Archival Records Found
            </h4>
            <p className="font-sans text-xs text-ink-muted">
              No titles match the selected genre in this category. Try selecting another genre or tab.
            </p>
          </div>
        )}

        {/* Populated Grid */}
        {!isLoading && !isError && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.slice(0, 8).map((item) => (
              <article
                key={item.id}
                className="group border border-paper-rule rounded-sm bg-paper-canvas p-3 flex flex-col justify-between space-y-3 hover:border-ink-caption transition-colors"
              >
                <div className="space-y-3">
                  {/* Poster Art with fallback */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-paper-surface border border-paper-rule">
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale-[10%] group-hover:scale-[1.015] transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-paper-canvas/95 px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider uppercase text-ink-primary border border-paper-rule">
                      {item.mediaType}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono text-ink-caption">
                      <span>{item.year}</span>
                      <span className="text-rating-gold font-bold flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-rating-gold" />
                        <span>TMDB {item.tmdbRating}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-ink-primary group-hover:text-accent-warm transition-colors leading-snug line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="font-sans text-xs text-ink-muted leading-relaxed line-clamp-2">
                      {item.synopsis}
                    </p>
                  </div>
                </div>

                {item.genreNames.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-paper-rule">
                    {item.genreNames.slice(0, 2).map((g) => (
                      <span
                        key={g}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-paper-surface text-ink-caption border border-paper-rule"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
