import { Star } from 'lucide-react';
import { TRENDING_REPERTOIRE } from '@/data/mock-media';

export default function TrendingRepertoire() {
  const { lead, dualFrames, digest } = TRENDING_REPERTOIRE;

  return (
    <section className="py-14 border-b border-paper-rule" aria-labelledby="trending-repertoire-title" id="trending">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-paper-rule mb-8 gap-2">
          <div>
            <div className="text-[11px] font-mono tracking-wider text-ink-caption uppercase mb-1">
              THE CRITICAL DIGEST // DISPATCH SELECTION
            </div>
            <h2 id="trending-repertoire-title" className="font-serif text-2xl sm:text-3xl font-semibold text-ink-primary tracking-tight">
              The Cultural Repertoire
            </h2>
          </div>
          <div className="text-xs font-mono text-ink-caption">
            RANKED BY VERIFIED CRITICAL RECEPTION
          </div>
        </div>

        {/* Asymmetric Broadsheet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column 1: Lead Critic Focus (5 cols on Desktop) */}
          <article className="lg:col-span-5 space-y-4 group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-paper-rule bg-paper-surface">
              <img
                src={lead.imageUrl}
                alt={lead.title}
                className="w-full h-full object-cover grayscale-[10%] group-hover:scale-[1.015] transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-paper-canvas/95 px-2.5 py-1 text-xs font-mono font-bold text-accent-warm border border-paper-rule">
                RANK #01
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-ink-caption">
                <span>{lead.year}</span>
                <span>&bull;</span>
                <span>{lead.runtime}</span>
                <span>&bull;</span>
                <span className="text-rating-gold font-bold flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-rating-gold" />
                  <span>TMDB {lead.tmdbRating}</span>
                </span>
              </div>

              <h3 className="font-serif text-2xl font-semibold text-ink-primary group-hover:text-accent-warm transition-colors leading-tight">
                {lead.title}
              </h3>

              <p className="font-serif italic text-xs text-ink-muted">
                Directed by <span className="text-ink-primary not-italic font-medium">{lead.director}</span>
              </p>

              <p className="font-sans text-xs text-ink-muted leading-relaxed line-clamp-3">
                {lead.synopsis}
              </p>
            </div>
          </article>

          {/* Column 2: Dual Frames (4 cols on Desktop) */}
          <div className="lg:col-span-4 space-y-8">
            {dualFrames.map((movie, index) => (
              <article key={movie.id} className="space-y-3 group pb-6 border-b border-paper-rule last:border-b-0 last:pb-0">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-paper-rule bg-paper-surface">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover grayscale-[10%] group-hover:scale-[1.015] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 bg-paper-canvas/95 px-2 py-0.5 text-[10px] font-mono font-bold text-ink-primary border border-paper-rule">
                    RANK #{String(index + 2).padStart(2, '0')}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-ink-caption">
                    <span>{movie.year}</span>
                    <span>&bull;</span>
                    <span>{movie.runtime}</span>
                    <span>&bull;</span>
                    <span className="text-rating-gold font-bold">★ {movie.tmdbRating}</span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-ink-primary group-hover:text-accent-warm transition-colors leading-snug">
                    {movie.title}
                  </h3>

                  <p className="font-serif italic text-xs text-ink-muted">
                    Directed by <span className="text-ink-primary not-italic font-medium">{movie.director}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Column 3: Compact Ranked Digest (3 cols on Desktop) */}
          <aside className="lg:col-span-3 space-y-6 pt-2 lg:pt-0">
            <div className="pb-2 border-b border-paper-rule text-[11px] font-mono tracking-wider text-ink-caption uppercase">
              NOTABLE MENTIONS // #04 — #06
            </div>

            <div className="space-y-6">
              {digest.map((item, idx) => (
                <article key={item.id} className="group space-y-2 pb-5 border-b border-paper-rule last:border-b-0 last:pb-0">
                  <div className="flex items-start space-x-3">
                    <span className="font-mono text-sm font-bold text-accent-warm shrink-0 pt-0.5">
                      #{String(idx + 4).padStart(2, '0')}
                    </span>
                    <div className="space-y-1">
                      <h4 className="font-serif text-base font-semibold text-ink-primary group-hover:text-accent-warm transition-colors leading-tight">
                        {item.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-[10px] font-mono text-ink-caption">
                        <span>{item.year}</span>
                        <span>&bull;</span>
                        <span>Dir. {item.director}</span>
                        <span>&bull;</span>
                        <span className="text-rating-gold font-bold">★ {item.tmdbRating}</span>
                      </div>
                      <p className="font-sans text-[11px] text-ink-muted leading-relaxed line-clamp-2">
                        {item.synopsis}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
