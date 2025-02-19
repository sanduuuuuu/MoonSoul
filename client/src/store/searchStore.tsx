// store/searchStore.ts
import { create } from 'zustand';

interface SearchState {
  isSearchOpen: boolean;
  toggleSearch: () => void;
  openSearch: () => void;
  closeSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  isSearchOpen: false, // Initial state: search popup is closed
  toggleSearch: () => set((state) => ({isSearchOpen:!state.isSearchOpen})), // Toggle open/close
  openSearch: () => set({ isSearchOpen: true }), // Explicitly open
  closeSearch: () => set({ isSearchOpen: false }), // Explicitly close
}))