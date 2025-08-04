import { useThemeStore } from '../store/ThemeStore';

export const useTheme = () => {
  const { isDark, colors, toggleTheme, setTheme } = useThemeStore();

  return {
    isDark,
    colors,
    toggleTheme,
    setTheme,
  };
};
