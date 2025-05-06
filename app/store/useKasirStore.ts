import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface Item {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface KasirState {
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  syncOfflineData: () => void;
}

export const useKasirStore = create<KasirState>((set, get) => ({
  cart: [],
  
  addToCart: (item) => {
    const updated = [...get().cart, item];
    set({ cart: updated });
    AsyncStorage.setItem('cart', JSON.stringify(updated));
  },

  removeFromCart: (id) => {
    const updated = get().cart.filter(i => i.id !== id);
    set({ cart: updated });
    AsyncStorage.setItem('cart', JSON.stringify(updated));
  },

  clearCart: () => {
    set({ cart: [] });
    AsyncStorage.removeItem('cart');
  },

  syncOfflineData: async () => {
    const data = await AsyncStorage.getItem('cart');
    if (data) {
      set({ cart: JSON.parse(data) });
    }
  }
}));
