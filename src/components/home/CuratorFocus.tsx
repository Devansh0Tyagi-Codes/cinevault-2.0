import { CURATOR_RETROSPECTIVE } from '@/data/mock-media';
import { Film, ArrowUpRight } from 'lucide-react';

export default function CuratorFocus() {
  const { title, period, essay, imageUrl, films } = CURATOR_RETROSPECTIVE;

  return (
    <section className="py-16 bg-paper-surface border-b border-paper-rule" aria-labelledby="curator-retrospective-title" id="retrospective">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Archival Still (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-paper-rule bg-paper-canvas group">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover grayscale-[15%] group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute bottom-3 left-3 bg-paper-canvas/95 px-2.5 py-1 text-[10px] font-mono font-medium tracking-wider text-ink-primary border border-paper-rule">
                ARCHIVAL PRESERVATION
              </div>
            </div>
            <p className="text-[10px] font-mono text-ink-caption tracking-wider uppercase text-right">
              CELLULOID RETROSPECTIVE ARCHIVE
            </p>
          </div>

          {/* Right Column: Editorial Essay & Filmography Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[11px] font-mono tracking-wider text-accent-warm uppercase">
                <Film className="h-3.5 w-3.5" />
                <span>THE VAULT RETROSPECTIVE // AUTEUR STUDY</span>
              </div>
              <h2 id="curator-retrospective-title" className="font-serif text-3xl sm:text-4xl font-semibold text-ink-primary tracking-tight">
                {title}
              </h2>
              <p className="font-mono text-xs text-ink-caption">
                {period}
              </p>
            </div>

            <p className="font-sans text-sm sm:text-[15px] text-ink-muted leading-relaxed">
              {essay}
            </p>

            {/* Curated Filmography Mini-List */}
            <div className="pt-4 border-t border-paper-rule">
              <div className="text-[11px] font-mono text-ink-caption uppercase tracking-wider mb-3">
                ESSENTIAL ARCHIVAL WORKS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {films.map((film) => (
                  <div
                    key={film.title}
                    className="p-3 bg-paper-canvas border border-paper-rule rounded-sm space-y-1 hover:border-accent-warm transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-ink-caption">{film.year}</span>
                      <ArrowUpRight className="h-3 w-3 text-ink-caption group-hover:text-accent-warm transition-colors" />
                    </div>
                    <h4 className="font-serif text-sm font-semibold text-ink-primary group-hover:text-accent-warm transition-colors leading-tight">
                      {film.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] font-mono text-ink-caption pt-1">
                      <span>{film.runtime}</span>
                      <span className="text-rating-gold font-bold">★ {film.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
