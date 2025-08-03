import { create } from 'zustand';
import { Product } from '../types/product';
import { saveCartToStorage, loadCartFromStorage } from '../utils/storage';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  isLoaded: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number, removeAll?: boolean) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  getCartTotal: () => string;
  getCartCount: () => number;
  loadCartFromStorage: () => Promise<void>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  cartItems: [],
  isLoaded: false,
  
  loadCartFromStorage: async () => {
    const savedCartItems = await loadCartFromStorage();
    set({ cartItems: savedCartItems, isLoaded: true });
  },

  addToCart: (product: Product) => {
    set((state: CartState) => {
      const itemExists = state.cartItems.find(
        (item: CartItem) => item.id === product.id,
      );
      let newCartItems: CartItem[];
      
      if (itemExists) {
        newCartItems = state.cartItems.map((item: CartItem) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        newCartItems = [...state.cartItems, { ...product, quantity: 1 }];
      }
      
      // Save to storage
      saveCartToStorage(newCartItems);
      
      return { cartItems: newCartItems };
    });
  },
  removeFromCart: (productId: number, removeAll = false) => {
    set(state => {
      const itemExists = state.cartItems.find(item => item.id === productId);
      let newCartItems: CartItem[];
      
      if (itemExists && itemExists.quantity > 1 && !removeAll) {
        newCartItems = state.cartItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      } else {
        newCartItems = state.cartItems.filter(item => item.id !== productId);
      }
      
      // Save to storage
      saveCartToStorage(newCartItems);
      
      return { cartItems: newCartItems };
    });
  },
  increaseQuantity: (productId: number) => {
    set(state => {
      const newCartItems = state.cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      );
      
      // Save to storage
      saveCartToStorage(newCartItems);
      
      return { cartItems: newCartItems };
    });
  },
  decreaseQuantity: (productId: number) => {
    set(state => {
      const itemExists = state.cartItems.find(item => item.id === productId);
      let newCartItems: CartItem[];
      
      if (itemExists && itemExists.quantity > 1) {
        newCartItems = state.cartItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      } else {
        newCartItems = state.cartItems.filter(item => item.id !== productId);
      }
      
      // Save to storage
      saveCartToStorage(newCartItems);
      
      return { cartItems: newCartItems };
    });
  },
  getCartTotal: () => {
    return get()
      .cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  },
  getCartCount: () => {
    return get().cartItems.reduce((count, item) => count + item.quantity, 0);
  },
  clearCart: () => {
    set({ cartItems: [] });
    saveCartToStorage([]);
  },
}));
