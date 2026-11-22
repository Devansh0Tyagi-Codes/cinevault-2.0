import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import { getPlatformShortcut } from '@/lib/platform';
import App from '@/App';

describe('CineVault 2.0 — Light Minimal Discovery & Community Verdicts Suite', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_TMDB_API_KEY', '');
    useUIStore.setState({
      isCommandPaletteOpen: false,
      isMobileMenuOpen: false,
      activeTrailerId: null,
      preferredRegion: 'IN',
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('verifies utility class merger (cn helper) works seamlessly with light tokens', () => {
    const combined = cn('px-4 py-2', false && 'opacity-50', 'bg-minimal-canvas', 'px-6');
    expect(combined).toBe('py-2 bg-minimal-canvas px-6');
  });

  it('verifies Zustand global UI store initializes and toggles state', () => {
    expect(useUIStore.getState().preferredRegion).toBe('IN');
    expect(useUIStore.getState().isCommandPaletteOpen).toBe(false);

    useUIStore.getState().toggleCommandPalette();
    expect(useUIStore.getState().isCommandPaletteOpen).toBe(true);

    useUIStore.getState().setPreferredRegion('US');
    expect(useUIStore.getState().preferredRegion).toBe('US');
  });

  it('verifies platform-aware search shortcut returns valid keystroke', () => {
    const shortcut = getPlatformShortcut();
    expect(['⌘K', 'Ctrl+K']).toContain(shortcut);
  });

  it('renders all 9 Light Minimal Discovery sections with proper accessibility landmarks', async () => {
    render(React.createElement(App));

    // 1. Accessibility Skip Link
    expect(screen.getByText(/Skip to main content/i)).toBeInTheDocument();

    // 2. Navigation Wordmark
    expect(screen.getAllByText(/CINEVAULT/i).length).toBeGreaterThanOrEqual(1);

    // 3. Cinematic Hero Spotlight (Async resolution from query)
    expect(await screen.findByRole('heading', { level: 1, name: /Dune: Part Two/i }, { timeout: 4000 })).toBeInTheDocument();
    expect(await screen.findByText(/EXPLORE TITLE/i, {}, { timeout: 4000 })).toBeInTheDocument();

    // 4. Latest Movie Releases Section
    expect(await screen.findByRole('heading', { level: 2, name: /Latest Movie Releases/i }, { timeout: 4000 })).toBeInTheDocument();

    // 5. Coming Soon Section
    expect(await screen.findByRole('heading', { level: 2, name: /Coming Soon/i }, { timeout: 4000 })).toBeInTheDocument();

    // 6. Trending Movies Section
    expect(await screen.findByRole('heading', { level: 2, name: /Trending Movies/i }, { timeout: 4000 })).toBeInTheDocument();

    // 7. Popular TV Shows Section
    expect(await screen.findByRole('heading', { level: 2, name: /Popular TV Shows/i }, { timeout: 4000 })).toBeInTheDocument();

    // 8. Top Rated Movies Section
    expect(await screen.findByRole('heading', { level: 2, name: /Top Rated Movies/i }, { timeout: 4000 })).toBeInTheDocument();

    // 9. Release Calendar Radar Section
    expect(screen.getByRole('heading', { level: 2, name: /Release Calendar/i })).toBeInTheDocument();

    // 10. Community Verdicts Section
    expect(screen.getByRole('heading', { level: 2, name: /Community Verdicts/i })).toBeInTheDocument();

    // 11. Watchlist Teaser Section
    expect(screen.getByRole('heading', { level: 2, name: /Build Your Private Film Archive/i })).toBeInTheDocument();

    // 12. Footer with TMDB Attribution and Cinema Showtimes Notice
    expect(screen.getByText(/TMDB Attribution/i)).toBeInTheDocument();
    expect(screen.getByText(/Cinema Showtimes Notice/i)).toBeInTheDocument();
  }, 15000);
});
