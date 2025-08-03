import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem } from '../store/CartStore';

const CART_STORAGE_KEY = '@cart_items';

export const saveCartToStorage = async (cartItems: CartItem[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(cartItems);
    await AsyncStorage.setItem(CART_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

export const loadCartFromStorage = async (): Promise<CartItem[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return [];
  }
};

export const clearCartFromStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cart from storage:', error);
  }
};
