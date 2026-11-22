import { useState } from 'react';
import { Bookmark, Star, Play, Clapperboard } from 'lucide-react';
import { useTrendingMovies } from '@/hooks/useTMDB';
import MediaSkeleton from '@/components/common/MediaSkeleton';
import ErrorCard from '@/components/common/ErrorCard';
import MockModeBadge from '@/components/common/MockModeBadge';
import VerdictBadge from '@/components/verdicts/VerdictBadge';

export default function CinematicHero() {
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { data, isLoading, isError, error, refetch } = useTrendingMovies('week');

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    setToastMessage(
      !isSaved
        ? 'Saved to Vault (Prototype state — full database persistence connects in Milestone 6)'
        : 'Removed from Vault'
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  if (isLoading) {
    return (
      <section className="relative pt-6 pb-12 border-b border-border-default" aria-label="Loading featured spotlight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <MediaSkeleton aspectRatio="2.39/1" className="w-full h-80 sm:h-96" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="pt-6 pb-12 border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorCard
            title="Featured Spotlight Unavailable"
            message={error instanceof Error ? error.message : 'Failed to connect to TMDB services.'}
            onRetry={() => refetch()}
          />
        </div>
      </section>
    );
  }

  const items = data?.items || [];
  const heroItem = items[0];

  if (!heroItem) {
    return null;
  }

  return (
    <section id="featured" className="relative pt-4 pb-14 border-b border-[#6D8795] bg-[#446879] overflow-hidden" aria-labelledby="hero-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Mock Mode Alert Banner (If credentials are missing) */}
        {data?.isMockMode && <MockModeBadge className="mb-2" />}

        {/* Panoramic Cinematic Stage */}
        <div className="relative rounded-2xl overflow-hidden border border-[#6D8795] bg-[#385665] shadow-card">
          <div className="relative min-h-[500px] sm:min-h-[440px] lg:min-h-[480px] w-full overflow-hidden">
            {/* Backdrop Image */}
            <img
              src={heroItem.backdropUrl}
              alt={`${heroItem.title} — Cinematic Backdrop`}
              className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[102%]"
              loading="eager"
            />
            {/* Non-opaque blue-grey scrims: mobile vertical gradient; desktop left-to-right subtle editorial gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#446879]/95 via-[#446879]/75 via-50% to-[#446879]/20 sm:hidden pointer-events-none" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-[#446879]/95 via-[#446879]/70 via-40% to-transparent sm:w-3/4 lg:w-3/5 pointer-events-none" />
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#446879]/40 via-transparent to-transparent pointer-events-none" />

            {/* Content Overlay */}
            <div className="relative flex flex-col justify-end min-h-[500px] sm:min-h-[440px] lg:min-h-[480px] p-6 sm:p-10 lg:p-12 z-10">
              <div className="max-w-2xl space-y-4">
                {/* Top Tags & Release Status */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-white text-[#304957] font-mono font-bold text-[10px] tracking-wider uppercase flex items-center space-x-1 shadow-subtle">
                    <Clapperboard className="h-3 w-3" />
                    <span>FEATURED SPOTLIGHT</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#527789] border border-[#6D8795] text-white font-mono text-[10px] font-semibold tracking-wider uppercase shadow-subtle">
                    {data?.isMockMode ? 'THEATRICAL RELEASE (DEMO)' : 'THEATRICAL PREMIERE'}
                  </span>
                  {heroItem.genreNames.slice(0, 3).map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-0.5 rounded bg-[#385665]/80 border border-[#6D8795] text-[#E1E9ED] font-mono text-[10px]"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1
                  id="hero-title"
                  className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]"
                >
                  {heroItem.title}
                </h1>

                {/* Community Verdict & TMDB Scores */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {/* Live Community Verdict Pill */}
                  <VerdictBadge
                    tmdbId={heroItem.rawId}
                    mediaType={heroItem.mediaType}
                    mediaTitle={heroItem.title}
                    size="md"
                  />

                  {/* TMDB Official Score */}
                  <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#385665]/90 border border-[#6D8795] font-mono text-xs text-white shadow-subtle">
                    <Star className="h-3.5 w-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                    <span className="font-bold text-white">{heroItem.tmdbRating}/10</span>
                    <span className="text-[10px] text-[#C4D2D9]">TMDB</span>
                  </div>

                  <div className="text-xs font-mono text-[#C4D2D9]">
                    RELEASE DATE: <strong className="text-white">{heroItem.releaseDate}</strong>
                  </div>
                </div>

                {/* Editorial Synopsis */}
                <p className="font-sans text-xs sm:text-sm text-[#E1E9ED] leading-relaxed line-clamp-3 max-w-xl">
                  {heroItem.synopsis}
                </p>

                {/* High-Contrast Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <a
                    href="#latest-releases"
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white hover:bg-[#E1E9ED] text-[#304957] font-display text-xs font-extrabold tracking-wider transition-all shadow-card cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5 fill-[#304957] text-[#304957]" />
                    <span>EXPLORE TITLE</span>
                  </a>

                  <button
                    onClick={handleSaveToggle}
                    className={`inline-flex items-center space-x-2 px-5 py-3 rounded-xl border text-xs font-display font-bold tracking-wide transition-all shadow-subtle cursor-pointer ${
                      isSaved
                        ? 'bg-white text-[#304957] border-white'
                        : 'bg-transparent hover:bg-white/10 border-white text-white'
                    }`}
                    aria-pressed={isSaved}
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-[#304957] text-[#304957]' : 'text-white'}`} />
                    <span>{isSaved ? 'SAVED TO VAULT' : 'ADD TO VAULT'}</span>
                  </button>
                </div>

                {/* Toast */}
                {toastMessage && (
                  <div className="text-[11px] font-mono bg-[#385665] border border-[#6D8795] p-2 rounded text-white animate-in fade-in duration-200 shadow-subtle">
                    {toastMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
