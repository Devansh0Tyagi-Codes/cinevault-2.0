import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import { getPlatformShortcut } from '@/lib/platform';
import App from '@/App';

describe('Milestone 1 — Modern Film Journal Shell Suite', () => {
  beforeEach(() => {
    useUIStore.setState({
      isCommandPaletteOpen: false,
      isMobileMenuOpen: false,
      activeTrailerId: null,
      preferredRegion: 'IN',
    });
  });

  it('verifies utility class merger (cn helper) works seamlessly', () => {
    const combined = cn('px-4 py-2', false && 'opacity-50', 'bg-paper-canvas', 'px-6');
    expect(combined).toBe('py-2 bg-paper-canvas px-6');
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

  it('renders all Milestone 1 editorial sections with proper accessibility landmarks', () => {
    render(<App />);

    // 1. Accessibility Skip Link
    expect(screen.getByText(/Skip to main content/i)).toBeInTheDocument();

    // 2. Navigation Wordmark (in Header and Footer)
    expect(screen.getAllByText(/C I N E V A U L T/i).length).toBeGreaterThanOrEqual(1);

    // 3. Hero Dispatch Section
    expect(screen.getByRole('heading', { name: /Dune: Part Two/i })).toBeInTheDocument();
    expect(screen.getByText(/Denis Villeneuve/i)).toBeInTheDocument();
    expect(screen.getByText(/EXPLORE FEATURE/i)).toBeInTheDocument();

    // 4. Cultural Repertoire Section
    expect(screen.getByRole('heading', { name: /The Cultural Repertoire/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Oppenheimer' })).toBeInTheDocument();

    // 5. Release Radar Section with Prototype Disclaimers
    expect(screen.getByRole('heading', { name: /Release Radar/i })).toBeInTheDocument();
    expect(screen.getAllByText(/PROTOTYPE PREVIEW/i).length).toBeGreaterThanOrEqual(1);

    // 6. Curator Retrospective Section
    expect(screen.getByRole('heading', { name: /The Visual Poetry of Wong Kar-wai/i })).toBeInTheDocument();

    // 7. Footer with TMDB and Cinema Showtimes Notice
    expect(screen.getByText(/TMDB Attribution/i)).toBeInTheDocument();
    expect(screen.getByText(/Cinema Showtimes Notice/i)).toBeInTheDocument();
  });
});
