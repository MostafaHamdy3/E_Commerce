import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeToggle from './ThemeToggle';
import CartButton from './CartButton';

const HeaderRight = () => {
  return (
    <View style={styles.container}>
      <ThemeToggle />
      <CartButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default HeaderRight;
