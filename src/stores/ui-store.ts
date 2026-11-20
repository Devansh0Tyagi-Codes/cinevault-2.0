import { create } from 'zustand';

export interface UIState {
  isCommandPaletteOpen: boolean;
  isMobileMenuOpen: boolean;
  activeTrailerId: string | null;
  preferredRegion: string;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setActiveTrailerId: (id: string | null) => void;
  setPreferredRegion: (region: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCommandPaletteOpen: false,
  isMobileMenuOpen: false,
  activeTrailerId: null,
  preferredRegion: 'IN', // Default region set to India for regional release filtering

  setCommandPaletteOpen: (open) => set({ isCommandPaletteOpen: open }),
  toggleCommandPalette: () =>
    set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen })),
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setActiveTrailerId: (id) => set({ activeTrailerId: id }),
  setPreferredRegion: (region) => set({ preferredRegion: region }),
}));
