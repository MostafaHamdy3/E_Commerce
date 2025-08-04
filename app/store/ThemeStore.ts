import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme, ThemeColors } from '../utils/Constants';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
  loadThemeFromStorage: () => Promise<void>;
}

const THEME_STORAGE_KEY = '@app_theme';

export const useThemeStore = create<ThemeState>()((set, get) => ({
  isDark: false,
  colors: lightTheme,

  toggleTheme: () => {
    const { isDark } = get();
    const newTheme = !isDark;
    const newColors = newTheme ? darkTheme : lightTheme;

    set({
      isDark: newTheme,
      colors: newColors,
    });

    AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newTheme));
  },

  setTheme: (mode: ThemeMode) => {
    const isDark = mode === 'dark';
    const colors = isDark ? darkTheme : lightTheme;

    set({ isDark, colors });

    AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(isDark));
  },

  loadThemeFromStorage: async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme !== null) {
        const isDark = JSON.parse(savedTheme);
        const colors = isDark ? darkTheme : lightTheme;
        set({ isDark, colors });
      }
    } catch (error) {
      console.error('Error loading theme from storage:', error);
    }
  },
}));
