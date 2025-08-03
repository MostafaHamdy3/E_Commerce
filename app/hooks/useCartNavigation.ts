import { useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../types/navigation';
import { useCartStore } from '../store/CartStore';
import React from 'react';
import CartButton from '../components/CartButton';

export const useCartNavigation = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getCartCount } = useCartStore();

  const cartCount = getCartCount();

  const headerRight = useCallback(() => React.createElement(CartButton), []);

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [navigation, cartCount, headerRight]);
};
