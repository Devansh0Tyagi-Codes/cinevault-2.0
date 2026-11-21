import { useState } from 'react';
import { Search, Globe2, Menu, X, Bookmark, Film } from 'lucide-react';
import { useUIStore } from '@/stores/ui-store';
import { getPlatformShortcut } from '@/lib/platform';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { preferredRegion, setPreferredRegion, toggleCommandPalette } = useUIStore();
  const shortcut = getPlatformShortcut();

  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <header className="sticky top-0 z-40 bg-paper-canvas/95 backdrop-blur-md border-b border-paper-rule transition-colors">
      {/* Top Colophon Line (Editorial Print Header) */}
      <div className="border-b border-paper-rule text-[11px] font-mono tracking-wider text-ink-caption uppercase px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline">CINEVAULT JOURNAL</span>
            <span className="hidden sm:inline text-paper-rule">•</span>
            <span>FILM &amp; TELEVISION ARCHIVE</span>
          </div>

          <div className="hidden md:block text-center text-ink-caption">
            {todayFormatted}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setPreferredRegion(preferredRegion === 'IN' ? 'US' : 'IN')}
              className="flex items-center space-x-1.5 hover:text-ink-primary transition-colors cursor-pointer"
              title="Click to cycle active release region"
              aria-label={`Current Region: ${preferredRegion}. Click to switch.`}
            >
              <Globe2 className="h-3 w-3 text-accent-warm" />
              <span>REGION: <strong>{preferredRegion}</strong></span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between" aria-label="Main Navigation">
        {/* Brand Wordmark */}
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="flex items-center space-x-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-warm rounded"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-widest text-ink-primary group-hover:text-accent-warm transition-colors">
              C I N E V A U L T
            </span>
            <span className="text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-paper-surface border border-paper-rule text-ink-caption">
              2.0
            </span>
          </a>
        </div>

        {/* Desktop Primary Links */}
        <div className="hidden lg:flex items-center space-x-8 text-[14px] font-medium tracking-wide">
          <a
            href="#discover"
            className="text-ink-primary relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent-warm"
          >
            Discover
          </a>
          <a
            href="#movies"
            className="text-ink-muted hover:text-ink-primary transition-colors py-1"
          >
            Movies
          </a>
          <a
            href="#tv"
            className="text-ink-muted hover:text-ink-primary transition-colors py-1"
          >
            TV Series
          </a>
          <a
            href="#release-radar"
            className="text-ink-muted hover:text-ink-primary transition-colors flex items-center space-x-1.5 py-1"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-warm animate-pulse" />
            <span>Release Radar</span>
          </a>
        </div>

        {/* Desktop Utility Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Omni-Search Platform-Aware Trigger */}
          <button
            onClick={toggleCommandPalette}
            className="flex items-center space-x-2.5 px-3.5 py-2 rounded-sm bg-paper-surface hover:bg-paper-highlight border border-paper-rule text-ink-muted hover:text-ink-primary text-xs transition-colors cursor-pointer group"
            aria-label="Open Omni-Search Command Palette"
          >
            <Search className="h-3.5 w-3.5 text-ink-caption group-hover:text-ink-primary transition-colors" />
            <span className="font-sans">Search catalog...</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-paper-canvas border border-paper-rule rounded-sm text-ink-caption font-semibold">
              {shortcut}
            </kbd>
          </button>

          {/* Vault Saved Link Placeholder */}
          <a
            href="#vault"
            className="p-2 text-ink-muted hover:text-ink-primary rounded-sm hover:bg-paper-surface border border-transparent hover:border-paper-rule transition-colors"
            title="Saved in Vault"
            aria-label="View Saved Vault Items"
          >
            <Bookmark className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={toggleCommandPalette}
            className="p-2 text-ink-muted hover:text-ink-primary border border-paper-rule rounded-sm bg-paper-surface"
            aria-label="Open Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-ink-primary border border-paper-rule rounded-sm bg-paper-surface hover:bg-paper-highlight"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-paper-rule bg-paper-surface px-6 py-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-4 font-serif text-lg text-ink-primary">
            <a
              href="#discover"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-accent-warm font-semibold"
            >
              Discover
            </a>
            <a
              href="#movies"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-accent-warm transition-colors"
            >
              Movies
            </a>
            <a
              href="#tv"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-accent-warm transition-colors"
            >
              TV Series
            </a>
            <a
              href="#release-radar"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-accent-warm transition-colors flex items-center space-x-2"
            >
              <span className="h-2 w-2 rounded-full bg-accent-warm" />
              <span>Release Radar</span>
            </a>
            <a
              href="#vault"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 hover:text-accent-warm transition-colors flex items-center space-x-2"
            >
              <Film className="h-4 w-4 text-ink-caption" />
              <span>The Vault Archive</span>
            </a>
          </div>

          <div className="mt-6 pt-4 border-t border-paper-rule flex items-center justify-between text-xs font-mono text-ink-caption">
            <span>REGION: {preferredRegion}</span>
            <button
              onClick={() => setPreferredRegion(preferredRegion === 'IN' ? 'US' : 'IN')}
              className="underline text-accent-warm"
            >
              Switch Region
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
