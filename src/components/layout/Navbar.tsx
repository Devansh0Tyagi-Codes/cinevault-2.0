import { useState } from 'react';
import { Search, Globe2, Menu, X, Bookmark, Clapperboard, Calendar, Sparkles } from 'lucide-react';
import { useUIStore } from '@/stores/ui-store';
import { getPlatformShortcut } from '@/lib/platform';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { preferredRegion, setPreferredRegion, toggleCommandPalette } = useUIStore();
  const shortcut = getPlatformShortcut();

  return (
    <header className="sticky top-0 z-40 bg-[#446879]/95 backdrop-blur-md border-b border-[#6D8795] transition-colors">
      {/* Primary Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between" aria-label="Main Navigation">
        {/* Brand Wordmark */}
        <div className="flex items-center space-x-6">
          <a
            href="/"
            className="flex items-center space-x-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-[#304957] shadow-subtle">
              <Clapperboard className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-widest text-white group-hover:text-[#E1E9ED] transition-colors">
                CINEVAULT
              </span>
              <span className="text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#527789] border border-[#6D8795] text-white">
                2.0
              </span>
            </div>
          </a>

          {/* Desktop Primary Links */}
          <div className="hidden lg:flex items-center space-x-6 text-[13px] font-medium tracking-wide text-[#E1E9ED]">
            <a
              href="#featured"
              className="hover:text-white transition-colors py-1"
            >
              Featured
            </a>
            <a
              href="#latest-releases"
              className="hover:text-white transition-colors py-1 flex items-center space-x-1"
            >
              <span>Latest Releases</span>
            </a>
            <a
              href="#coming-soon"
              className="hover:text-white transition-colors py-1"
            >
              Coming Soon
            </a>
            <a
              href="#trending"
              className="hover:text-white transition-colors py-1"
            >
              Trending
            </a>
            <a
              href="#series"
              className="hover:text-white transition-colors py-1"
            >
              Series
            </a>
            <a
              href="#calendar"
              className="hover:text-white transition-colors py-1 flex items-center space-x-1"
            >
              <Calendar className="h-3 w-3 text-[#C4D2D9]" />
              <span>Calendar</span>
            </a>
            <a
              href="#verdicts"
              className="hover:text-white transition-colors py-1 flex items-center space-x-1 text-white font-semibold"
            >
              <Sparkles className="h-3 w-3 text-[#C4D2D9]" />
              <span>Verdicts</span>
            </a>
          </div>
        </div>

        {/* Desktop Utility Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Omni-Search Platform-Aware Trigger */}
          <button
            onClick={toggleCommandPalette}
            className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-[#527789] hover:bg-[#385665] border border-[#6D8795] text-[#E1E9ED] hover:text-white text-xs transition-colors cursor-pointer group shadow-subtle"
            aria-label="Open Omni-Search Command Palette"
          >
            <Search className="h-3.5 w-3.5 text-[#C4D2D9] group-hover:text-white transition-colors" />
            <span className="font-sans">Search cinema...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#385665] border border-[#6D8795] rounded text-[#C4D2D9] font-semibold">
              {shortcut}
            </kbd>
          </button>

          {/* Region Switcher */}
          <button
            onClick={() => setPreferredRegion(preferredRegion === 'IN' ? 'US' : 'IN')}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-[#527789] hover:bg-[#385665] border border-[#6D8795] text-xs font-mono text-[#E1E9ED] hover:text-white transition-colors cursor-pointer"
            title="Click to cycle active release region"
            aria-label={`Current Region: ${preferredRegion}. Click to switch.`}
          >
            <Globe2 className="h-3.5 w-3.5 text-[#C4D2D9]" />
            <span>{preferredRegion}</span>
          </button>

          {/* Vault Saved Trigger */}
          <a
            href="#watchlist-teaser"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#527789] hover:bg-[#385665] border border-[#6D8795] text-white text-xs font-medium transition-colors shadow-subtle"
            title="Open Watchlist"
            aria-label="Open Watchlist"
          >
            <Bookmark className="h-3.5 w-3.5 text-[#C4D2D9]" />
            <span className="hidden xl:inline">My Vault</span>
          </a>
        </div>

        {/* Mobile Menu & Search Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={toggleCommandPalette}
            className="p-2 text-[#E1E9ED] hover:text-white border border-[#6D8795] rounded-lg bg-[#527789]"
            aria-label="Open Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white border border-[#6D8795] rounded-lg bg-[#527789] hover:bg-[#385665]"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-[#6D8795] bg-[#446879] px-6 py-6 animate-in fade-in slide-in-from-top-2 duration-200 shadow-card">
          <div className="flex flex-col space-y-4 font-display text-base text-white">
            <a
              href="#featured"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-[#E1E9ED] transition-colors"
            >
              Featured Spotlight
            </a>
            <a
              href="#latest-releases"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-[#E1E9ED] transition-colors"
            >
              Latest Movie Releases
            </a>
            <a
              href="#coming-soon"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-[#E1E9ED] transition-colors"
            >
              Coming Soon
            </a>
            <a
              href="#trending"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-[#E1E9ED] transition-colors"
            >
              Trending Movies
            </a>
            <a
              href="#series"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-[#E1E9ED] transition-colors"
            >
              Popular TV Shows
            </a>
            <a
              href="#calendar"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 flex items-center space-x-2 text-[#E1E9ED] hover:text-white"
            >
              <Calendar className="h-4 w-4" />
              <span>Release Calendar</span>
            </a>
            <a
              href="#verdicts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 flex items-center space-x-2 font-medium text-white"
            >
              <Sparkles className="h-4 w-4 text-[#C4D2D9]" />
              <span>Community Verdicts</span>
            </a>
            <a
              href="#watchlist-teaser"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#E1E9ED] hover:text-white flex items-center space-x-2"
            >
              <Bookmark className="h-4 w-4 text-[#C4D2D9]" />
              <span>Personal Watchlist</span>
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-[#6D8795] flex items-center justify-between text-xs font-mono text-[#C4D2D9]">
            <span>ACTIVE REGION: {preferredRegion}</span>
            <button
              onClick={() => setPreferredRegion(preferredRegion === 'IN' ? 'US' : 'IN')}
              className="underline text-white font-medium"
            >
              Switch to {preferredRegion === 'IN' ? 'US' : 'IN'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
