import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  slug: string;
  name: string;
  price: string | number;
  color: string;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isMenuOpen: boolean;
  
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  toggleMenu: () => void;
  closeMenu: () => void; // <-- Added this
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isCartOpen: false,
      isMenuOpen: false,

      addItem: (newItem) => set((state) => {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        if (existingItem) {
          return {
            items: state.items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item
            ),
          };
        }
        return { items: [...state.items, newItem] };
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

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),

      closeMenu: () => set({ isMenuOpen: false }), // <-- Added this
    }),
    {
      name: 'rm-hides-cart',
      partialize: (state) => ({ items: state.items }), 
    }
  )
);