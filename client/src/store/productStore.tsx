// store/productStore.ts
import { create } from 'zustand';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  viewMode: 'grid-4' | 'grid-3' | 'list';
  searchQuery: string;
  priceRange: [number, number];
  selectedCategories: string[];
  setProducts: (products: Product[]) => void;
  setViewMode: (mode: 'grid-4' | 'grid-3' | 'list') => void;
  setSearchQuery: (query: string) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleCategory: (category: string) => void;
  applyFilters: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  viewMode: 'grid-4',
  searchQuery: '',
  priceRange: [0, 10000],
  selectedCategories: [],

  setProducts: (products) => set({ products, filteredProducts: products }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setPriceRange: (range) => set({ priceRange: range }),
  toggleCategory: (category) =>
    set((state) => ({
      selectedCategories: state.selectedCategories.includes(category)
        ? state.selectedCategories.filter((c) => c !== category)
        : [...state.selectedCategories, category],
    })),

  applyFilters: () => {
    const { products, searchQuery, priceRange, selectedCategories } = get();
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      return matchesSearch && matchesPrice && matchesCategory;
    });
    set({ filteredProducts: filtered });
  },
  // fetchMockProducts: () => {
  //   const mockProducts: Product[] = [
  //     {
  //       id: '1',
  //       name: 'H&B Pure COD Liver Oil 500mg 60 Caps',
  //       price: 3590,
  //       category: 'Supplements',
  //       image: '/images/cod-liver-oil.jpg',
  //       description: 'A supplement for daily health benefits.',
  //     },
  //     {
  //       id: '2',
  //       name: 'Blistex Lip Conditioner Protect, Moisturizing',
  //       price: 4282,
  //       category: 'Lip Care',
  //       image: '/images/lip-balm.jpg',
  //       description: 'A lip conditioner with hydrating properties.',
  //     },
  //     {
  //       id: '3',
  //       name: 'La’Fresh Gold Face & Body Scrub 500ml',
  //       price: 1850,
  //       category: 'Skin Care',
  //       image: '/images/body-scrub.jpg',
  //       description: 'Exfoliating scrub for face and body.',
  //     },
  //   ];

  //   set({ products: mockProducts, filteredProducts: mockProducts });
  // },
}));