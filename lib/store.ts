// lib/store.ts
import { create } from 'zustand';

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: string;
  color: string;
  image: string;
  quantity: number;
};

interface AppState {
  // Cart State
  items: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // NEW: Mobile Menu State
  isMenuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const useCartStore = create<AppState>((set) => ({
  // Cart Logic
  items: [],
  isOpen: false,
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  closeCart: () => set({ isOpen: false }),
  addItem: (item) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      };
    }
    return { items: [...state.items, item] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  clearCart: () => set({ items: [] }), 

  // NEW: Menu Logic
  isMenuOpen: false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
}));