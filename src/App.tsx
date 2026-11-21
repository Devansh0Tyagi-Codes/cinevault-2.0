import Navbar from '@/components/layout/Navbar';
import HeroDispatch from '@/components/home/HeroDispatch';
import TrendingRepertoire from '@/components/home/TrendingRepertoire';
import ReleaseRadarPreview from '@/components/home/ReleaseRadarPreview';
import CuratorFocus from '@/components/home/CuratorFocus';
import Footer from '@/components/layout/Footer';
import { useUIStore } from '@/stores/ui-store';
import { getPlatformShortcut } from '@/lib/platform';
import { Search, X } from 'lucide-react';

export default function App() {
  const { isCommandPaletteOpen, toggleCommandPalette } = useUIStore();
  const shortcut = getPlatformShortcut();

  return (
    <div className="min-h-screen bg-paper-canvas text-ink-primary font-sans flex flex-col selection:bg-accent-wash selection:text-accent-warm">
      {/* Skip to Content for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-warm focus:text-white focus:text-xs focus:font-mono focus:rounded-sm focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1" role="main">
        {/* Section 1: Hero Feature Presentation */}
        <HeroDispatch />

        {/* Section 2: Trending Cultural Repertoire */}
        <TrendingRepertoire />

        {/* Section 3: Release Radar Preview */}
        <ReleaseRadarPreview />

        {/* Section 4: Curator Retrospective */}
        <CuratorFocus />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Omni-Search Prototype Dialog (Active in Milestone 4) */}
      {isCommandPaletteOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-dialog-title"
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-ink-primary/60 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={toggleCommandPalette}
        >
          <div
            className="w-full max-w-xl bg-paper-canvas border border-paper-rule rounded-sm shadow-xl p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-paper-rule">
              <div className="flex items-center space-x-3 text-ink-muted">
                <Search className="h-4 w-4 text-accent-warm" />
                <h3 id="search-dialog-title" className="font-serif text-base font-semibold text-ink-primary">
                  Omni-Search Archive
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <kbd className="px-2 py-0.5 text-[10px] font-mono bg-paper-surface border border-paper-rule rounded-sm text-ink-caption">
                  {shortcut}
                </kbd>
                <button
                  onClick={toggleCommandPalette}
                  className="p-1 text-ink-caption hover:text-ink-primary rounded"
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
                value="Search movies, directors, cinematography, release dates..."
                className="w-full px-3 py-2 text-xs font-mono bg-paper-surface border border-paper-rule rounded-sm text-ink-muted focus:outline-none"
              />
              <p className="text-[11px] font-mono text-ink-caption leading-relaxed">
                Prototype trigger demonstrated. Live debounced multi-search across movies, TV series, and filmmakers connects in <strong>Milestone 4</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
