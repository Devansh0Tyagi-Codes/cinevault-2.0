import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import App from '@/App';

describe('Milestone 0 Smoke Suite — Architecture & Foundation', () => {
  beforeEach(() => {
    // Reset Zustand store state before each test
    useUIStore.setState({
      isCommandPaletteOpen: false,
      isMobileMenuOpen: false,
      activeTrailerId: null,
      preferredRegion: 'IN',
    });
  });

  it('verifies utility class merger (cn helper) works seamlessly', () => {
    const combined = cn('px-4 py-2', false && 'opacity-50', 'bg-crimson-500', 'px-6');
    // twMerge should override px-4 with px-6
    expect(combined).toBe('py-2 bg-crimson-500 px-6');
  });

  it('verifies Zustand global UI store initializes and mutates state', () => {
    expect(useUIStore.getState().preferredRegion).toBe('IN');
    expect(useUIStore.getState().isCommandPaletteOpen).toBe(false);

    useUIStore.getState().toggleCommandPalette();
    expect(useUIStore.getState().isCommandPaletteOpen).toBe(true);

    useUIStore.getState().setPreferredRegion('US');
    expect(useUIStore.getState().preferredRegion).toBe('US');
  });

  it('renders the CineVault 2.0 application foundation without throwing', () => {
    render(<App />);
    expect(screen.getByText(/CINEVAULT 2\.0/i)).toBeInTheDocument();
    expect(screen.getByText(/Milestone 0: Architecture & Foundation Active/i)).toBeInTheDocument();
  });
});
