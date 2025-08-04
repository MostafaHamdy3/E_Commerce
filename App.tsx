import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from './app/navigation/AppNavigator';
import { useThemeStore } from './app/store/ThemeStore';
import { useTheme } from './app/hooks/useTheme';
import { ThemeColors } from './app/utils/Constants';

const App = () => {
  const { loadThemeFromStorage } = useThemeStore();
  const { isDark, colors } = useTheme();
  const styles = getStyles(colors);

  useEffect(() => {
    loadThemeFromStorage();
  }, [loadThemeFromStorage]);

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.bgScreen}
      />
      <AppNavigator />
    </View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgScreen,
  },
});

export default App;
