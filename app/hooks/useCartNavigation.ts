import React, { useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { NavigationProp } from '../types/navigation';
import { useCartStore } from '../store/CartStore';
import HeaderRight from '../components/HeaderRight';

export const useCartNavigation = () => {
  const navigation = useNavigation<NavigationProp>();
  const { getCartCount } = useCartStore();

  const cartCount = getCartCount();

  const headerRight = useCallback(() => React.createElement(HeaderRight), []);

  useEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [navigation, cartCount, headerRight]);
};
