// store/cartStore.ts
import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  isCartOpen: boolean;
  cartItems: CartItem[];
  toggleCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  isCartOpen: false,
  cartItems: [],
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  addToCart: (item) => set((state) => {
    const existingItem = state.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    }
    return { cartItems: [...state.cartItems, item] };
  }),
  removeFromCart: (itemId) => set((state) => ({
    cartItems: state.cartItems.filter(item => item.id !== itemId)
  })),
  updateQuantity: (itemId, newQuantity) => set((state) => ({
    cartItems: state.cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    )
  })),
  getSubtotal: () => get().cartItems.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  )
}));