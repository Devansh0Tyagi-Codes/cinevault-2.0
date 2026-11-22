import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import CinematicHero from '@/components/home/CinematicHero';
import LatestReleases from '@/components/home/LatestReleases';
import ComingSoon from '@/components/home/ComingSoon';
import TrendingMovies from '@/components/home/TrendingMovies';
import PopularSeries from '@/components/home/PopularSeries';
import TopRatedSection from '@/components/home/TopRatedSection';
import ReleaseCalendar from '@/components/home/ReleaseCalendar';
import CommunityVerdictsShowcase from '@/components/verdicts/CommunityVerdictsShowcase';
import WatchlistTeaser from '@/components/home/WatchlistTeaser';
import Footer from '@/components/layout/Footer';
import VerdictModal from '@/components/verdicts/VerdictModal';
import { useUIStore } from '@/stores/ui-store';
import { getPlatformShortcut } from '@/lib/platform';
import { Search, X } from 'lucide-react';

// Single QueryClient instance with 10-minute cache validity and zero automatic retry storms
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10, // 10 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  const { isCommandPaletteOpen, toggleCommandPalette } = useUIStore();
  const shortcut = getPlatformShortcut();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-minimal-canvas text-white font-sans flex flex-col selection:bg-white selection:text-[#304957]">
        {/* Skip to Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#304957] focus:text-xs focus:font-mono focus:rounded focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Global Navigation Header */}
        <Navbar />

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1 bg-minimal-canvas" role="main">
          {/* Section 1: Cinematic Hero Spotlight */}
          <CinematicHero />

          {/* Section 2: Latest Movie Releases (In Theatres Now) */}
          <LatestReleases />

          {/* Section 3: Coming Soon (Theatrical & Digital Drops) */}
          <ComingSoon />

          {/* Section 4: Trending Movies (Weekly Pulse) */}
          <TrendingMovies />

          {/* Section 5: Popular TV Shows (Episodic Series) */}
          <PopularSeries />

          {/* Section 6: Top Rated Movies (Hall of Fame) */}
          <TopRatedSection />

          {/* Section 7: Release Calendar Radar */}
          <ReleaseCalendar />

          {/* Section 8: Community Verdicts Showcase */}
          <CommunityVerdictsShowcase />

          {/* Section 9: Personalized Watchlist Teaser */}
          <WatchlistTeaser />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Community Verdict Submission & Detail Modal */}
        <VerdictModal />

        {/* Omni-Search Prototype Dialog (Active in Milestone 4) */}
        {isCommandPaletteOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
            onClick={toggleCommandPalette}
          >
            <div
              className="w-full max-w-xl bg-white border border-[#DEDFDC] rounded-xl shadow-card-hover p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#DEDFDC]">
                <div className="flex items-center space-x-3 text-[#202020]">
                  <Search className="h-4 w-4 text-[#304957]" />
                  <h3 id="search-dialog-title" className="font-display text-base font-bold text-[#202020]">
                    Omni-Search Cinema
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <kbd className="px-2 py-0.5 text-[10px] font-mono bg-[#F4F4F1] border border-[#DEDFDC] rounded text-[#686868] font-semibold">
                    {shortcut}
                  </kbd>
                  <button
                    onClick={toggleCommandPalette}
                    className="p-1 text-[#686868] hover:text-[#202020] hover:bg-[#F4F4F1] rounded transition-colors"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  readOnly
                  value="Search movies, TV series, directors, release dates..."
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-[#F4F4F1] border border-[#DEDFDC] rounded-lg text-[#202020] focus:outline-none"
                />
                <p className="text-[11px] font-mono text-[#686868] leading-relaxed">
                  Prototype trigger active. Live debounced multi-search across movies, TV series, and filmmakers connects in <strong>Milestone 4</strong>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </QueryClientProvider>
  );
}
