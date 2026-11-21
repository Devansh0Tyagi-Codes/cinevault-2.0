import { useState } from 'react';
import { Bookmark, ArrowRight, Star } from 'lucide-react';
import { HERO_DISPATCH } from '@/data/mock-media';

export default function HeroDispatch() {
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    setToastMessage(
      !isSaved
        ? 'Saved to Vault (Prototype state — full database persistence connects in Milestone 6)'
        : 'Removed from Vault'
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section className="relative pt-6 pb-14 border-b border-paper-rule" aria-labelledby="hero-dispatch-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Kicker Header */}
        <div className="flex items-center justify-between pb-4 border-b border-paper-rule mb-6">
          <div className="flex items-center space-x-2 text-[11px] font-mono tracking-wider text-ink-caption uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-warm" />
            <span>CURATOR&apos;S LEAD DISPATCH // FEATURE PRESENTATION</span>
          </div>
          <div className="hidden sm:block text-[11px] font-mono text-ink-caption uppercase">
            VERIFIED METADATA
          </div>
        </div>

        {/* Hero Grid Structure: 65% Media / 35% Editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Panoramic Cinematic Frame (7 cols on Desktop) */}
          <div className="lg:col-span-7 space-y-2">
            <div className="relative aspect-[16/9] sm:aspect-[2.39/1] lg:aspect-[16/10] overflow-hidden rounded-sm border border-paper-rule bg-paper-surface group">
              <img
                src={HERO_DISPATCH.imageUrl}
                alt={`${HERO_DISPATCH.title} — Cinematography frame`}
                className="w-full h-full object-cover grayscale-[15%] contrast-[105%] group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge on Artwork */}
              <div className="absolute bottom-3 left-3 bg-paper-canvas/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono font-medium tracking-wider text-ink-primary border border-paper-rule">
                CINEMA SCOPE 2.39:1
              </div>
            </div>

            {/* Photo Credit */}
            {HERO_DISPATCH.photoCredit && (
              <p className="text-[10px] font-mono text-ink-caption tracking-wider uppercase text-right">
                STILL COURTESY: {HERO_DISPATCH.photoCredit}
              </p>
            )}
          </div>

          {/* Editorial Lead Copy (5 cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 pt-1">
            <div className="space-y-4">
              {/* Genre Pills */}
              <div className="flex flex-wrap gap-1.5">
                {HERO_DISPATCH.genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-sm bg-paper-surface border border-paper-rule text-ink-caption"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Editorial Title */}
              <h1
                id="hero-dispatch-title"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tightest text-ink-primary leading-[1.08] text-balance"
              >
                {HERO_DISPATCH.title}
              </h1>

              {/* Credits Line */}
              <p className="font-serif italic text-sm text-ink-muted leading-relaxed">
                Directed by <span className="text-ink-primary not-italic font-medium">{HERO_DISPATCH.director}</span>
                {HERO_DISPATCH.cinematographer && (
                  <> &bull; Cinematography by <span className="text-ink-primary not-italic font-medium">{HERO_DISPATCH.cinematographer}</span></>
                )}
              </p>

              {/* Editorial Synopsis */}
              <p className="font-sans text-sm sm:text-[15px] text-ink-muted leading-relaxed pt-1">
                {HERO_DISPATCH.synopsis}
              </p>

              {/* Technical Metadata Matrix */}
              <div className="pt-3 pb-1 border-y border-paper-rule flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-ink-caption">
                <span>YEAR: <strong className="text-ink-primary">{HERO_DISPATCH.year}</strong></span>
                <span>&bull;</span>
                <span>RUNTIME: <strong className="text-ink-primary">{HERO_DISPATCH.runtime}</strong></span>
                <span>&bull;</span>
                <span>CERT: <strong className="text-ink-primary">{HERO_DISPATCH.certification}</strong></span>
                <span>&bull;</span>
                <span className="flex items-center space-x-1 text-rating-gold font-bold">
                  <Star className="h-3.5 w-3.5 fill-rating-gold" />
                  <span>TMDB {HERO_DISPATCH.tmdbRating}/10</span>
                  <span className="text-[10px] text-ink-caption font-normal">({HERO_DISPATCH.tmdbVotes})</span>
                </span>
              </div>
            </div>

            {/* Exactly Two Clean Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#details"
                className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-sm bg-accent-warm hover:bg-accent-hover text-white text-xs font-semibold tracking-wider transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm"
              >
                <span>EXPLORE FEATURE</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={handleSaveToggle}
                className={`inline-flex items-center justify-center space-x-2 px-4 py-3 rounded-sm border text-xs font-medium transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-accent-wash border-accent-warm text-accent-warm'
                    : 'bg-paper-canvas hover:bg-paper-surface border-paper-rule text-ink-primary'
                }`}
                aria-pressed={isSaved}
              >
                <Bookmark className={`h-3.5 w-3.5 ${isSaved ? 'fill-accent-warm' : ''}`} />
                <span>{isSaved ? 'SAVED TO VAULT' : 'SAVE TO VAULT'}</span>
              </button>
            </div>

            {/* Informational Toast */}
            {toastMessage && (
              <div className="text-[11px] font-mono bg-paper-surface border border-paper-rule p-2.5 rounded-sm text-ink-muted animate-in fade-in duration-200">
                {toastMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
