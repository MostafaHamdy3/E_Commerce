import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useCartStore } from '../store/CartStore';
import { colors } from '../utils/Constants';
import { NavigationProp } from '../types/navigation';

const CartButton = () => {
  const navigation = useNavigation<NavigationProp>();

  const { getCartCount } = useCartStore();

  const navToCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <TouchableOpacity style={styles.cartIcon} onPress={navToCart}>
      <View style={styles.cartCountContainer}>
        <Text style={styles.cartCount}>{getCartCount()}</Text>
      </View>
      <Image
        source={require('../assets/images/cart-outline.png')}
        style={styles.cartIconImage}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    paddingVertical: 12,
  },
  cartCountContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 12,
    position: 'absolute',
    zIndex: 1,
    top: 6,
    left: 12,
  },
  cartCount: {
    fontSize: 12,
    color: colors.bgContainer,
  },
  cartIconImage: {
    width: 24,
    height: 24,
  },
});

export default CartButton;
