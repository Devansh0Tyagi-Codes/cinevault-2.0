export default function Footer() {
  return (
    <footer className="bg-[#385665] border-t border-[#6D8795] text-[#E1E9ED] text-xs font-sans transition-colors" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Upper Editorial & Brand */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#6D8795]">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <span className="font-display text-2xl font-bold tracking-widest text-white">
                CINEVAULT
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#527789] text-white border border-[#6D8795] font-bold">
                2.0
              </span>
            </div>
            <p className="text-[#E1E9ED] font-sans text-sm max-w-md leading-relaxed">
              A premium, blue-grey editorial movie discovery and release-tracking platform. Engineered with real-time TMDB release intelligence, community-driven verdicts, and authentic curation.
            </p>
            <div className="text-[11px] font-mono text-[#C4D2D9]">
              BLUE-GREY EDITORIAL EDITION // 2026
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Discovery
            </h4>
            <ul className="space-y-2 text-[#E1E9ED]">
              <li><a href="#featured" className="hover:text-white transition-colors">Cinematic Hero</a></li>
              <li><a href="#latest-releases" className="hover:text-white transition-colors">Latest Releases</a></li>
              <li><a href="#coming-soon" className="hover:text-white transition-colors">Coming Soon</a></li>
              <li><a href="#trending" className="hover:text-white transition-colors">Trending Movies</a></li>
              <li><a href="#series" className="hover:text-white transition-colors">Popular TV Shows</a></li>
              <li><a href="#calendar" className="hover:text-white transition-colors">Release Calendar</a></li>
              <li><a href="#verdicts" className="hover:text-white transition-colors">Community Verdicts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Platform &amp; Data
            </h4>
            <ul className="space-y-2 text-[#C4D2D9]">
              <li><span>Vite 5 + React 18 + Strict TS</span></li>
              <li><span>React Query + Centralized Caching</span></li>
              <li><span>WCAG 2.1 AA Contrast Compliant</span></li>
              <li><span>TMDB API Metadata Integration</span></li>
              <li><span>Community Verdicts Engine</span></li>
            </ul>
          </div>
        </div>

        {/* Lower Legal & Third-Party Disclaimers */}
        <div className="pt-8 space-y-4 text-[11px] leading-relaxed text-[#C4D2D9]">
          {/* TMDB Attribution */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p>
              <strong className="text-white">TMDB Attribution:</strong> This product uses the TMDB API but is not endorsed or certified by TMDB. Film metadata, poster imagery, and verified release schedules are provided by The Movie Database.
            </p>
            <span className="font-mono text-[10px] tracking-wider shrink-0 bg-[#527789] px-2 py-1 rounded border border-[#6D8795] text-white font-bold">
              TMDB API COMPLIANT
            </span>
          </div>

          {/* Showtimes & Booking Disclaimer */}
          <p>
            <strong className="text-white">Cinema Showtimes Notice:</strong> Release dates denote verified national theatrical releases and authorized digital debuts. CineVault does not provide real-time cinema seat booking, box-office ticketing, or live screening schedules.
          </p>

          {/* Public References Notice */}
          <p>
            <strong className="text-white">Public References:</strong> Cast filmographies, external IDs, and historical reception records reference official TMDB and public IMDb catalog identifiers.
          </p>

          <div className="pt-4 border-t border-[#6D8795] flex flex-col sm:flex-row items-center justify-between text-[#C4D2D9] gap-2">
            <span>&copy; {new Date().getFullYear()} CineVault 2.0. All rights reserved.</span>
            <span className="font-mono text-[10px] text-white">PREMIUM BLUE-GREY EDITORIAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
