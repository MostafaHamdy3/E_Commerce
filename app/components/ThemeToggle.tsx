import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Image
        source={isDark
          ? require('../assets/images/dark_mood.png')
          : require('../assets/images/light_mood.png')
        }
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 42,
    height: 32,
  }
});

export default ThemeToggle;
