export default function Footer() {
  return (
    <footer className="bg-paper-surface border-t border-paper-rule text-ink-muted text-xs font-sans transition-colors" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Upper Editorial Colophon & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-paper-rule">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-semibold tracking-widest text-ink-primary">
                C I N E V A U L T
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-paper-highlight text-ink-caption border border-paper-rule">
                2.0
              </span>
            </div>
            <p className="text-ink-muted font-sans text-sm max-w-md leading-relaxed">
              An independent, content-first film and television publication engineered for cinema purists.
              Built with rigorous full-stack architecture, transparent data attribution, and real-time regional release intelligence.
            </p>
            <div className="text-[11px] font-mono text-ink-caption">
              VOL. II // FIRST EDITION PRINT // 2026
            </div>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-ink-primary uppercase tracking-wider mb-3">
              Exploration
            </h4>
            <ul className="space-y-2 text-ink-muted">
              <li><a href="#discover" className="hover:text-ink-primary transition-colors">Curated Feature Dispatches</a></li>
              <li><a href="#trending" className="hover:text-ink-primary transition-colors">The Cultural Repertoire</a></li>
              <li><a href="#release-radar" className="hover:text-ink-primary transition-colors">Release Radar &amp; Calendars</a></li>
              <li><a href="#retrospective" className="hover:text-ink-primary transition-colors">Archival Retrospectives</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm font-semibold text-ink-primary uppercase tracking-wider mb-3">
              Architecture &amp; Data
            </h4>
            <ul className="space-y-2 text-ink-muted">
              <li><span className="text-ink-caption">Vite 5 + React 18 + Strict TS</span></li>
              <li><span className="text-ink-caption">Zustand Global State</span></li>
              <li><span className="text-ink-caption">WCAG 2.1 AA Compliant</span></li>
              <li><span className="text-ink-caption">TMDB API Metadata Integration</span></li>
            </ul>
          </div>
        </div>

        {/* Lower Legal & Third-Party Disclaimers */}
        <div className="pt-8 space-y-4 text-[11px] leading-relaxed text-ink-caption">
          {/* TMDB Attribution */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p>
              <strong className="text-ink-muted">TMDB Attribution:</strong> This product uses the TMDB API but is not endorsed or certified by TMDB. Film metadata, poster imagery, and verified release schedules are provided by The Movie Database.
            </p>
            <span className="font-mono text-[10px] tracking-wider shrink-0 bg-paper-highlight px-2 py-1 rounded-sm border border-paper-rule text-ink-muted">
              TMDB COMPLIANT
            </span>
          </div>

          {/* Showtimes & Booking Disclaimer */}
          <p>
            <strong className="text-ink-muted">Cinema Showtimes Notice:</strong> Release dates denote verified national theatrical releases and authorized digital debuts. CineVault does not provide real-time cinema seat booking, box-office ticketing, or live screening schedules.
          </p>

          {/* IMDb Public References Notice */}
          <p>
            <strong className="text-ink-muted">Public References:</strong> Cast filmographies, external IDs, and historical reception records reference official TMDB and public IMDb catalog identifiers.
          </p>

          <div className="pt-4 border-t border-paper-rule flex flex-col sm:flex-row items-center justify-between text-ink-caption gap-2">
            <span>&copy; {new Date().getFullYear()} CineVault 2.0. All rights reserved.</span>
            <span className="font-mono text-[10px]">CRAFTED IN MODERN FILM JOURNAL DIRECTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
