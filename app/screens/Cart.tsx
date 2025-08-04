import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { CartItem, useCartStore } from '../store/CartStore';
import { useTheme } from '../hooks/useTheme';
import { ThemeColors } from '../utils/Constants';

const CartScreen = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartTotal,
    loadCartFromStorage,
    isLoaded,
  } = useCartStore();

  const { colors } = useTheme();
  const styles = getStyles(colors);

  useEffect(() => {
    if (!isLoaded) {
      loadCartFromStorage();
    }
  }, [loadCartFromStorage, isLoaded]);

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.images[0] }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.id)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id, true)}
      >
        <Image
          source={require('../assets/images/trash-outline.png')}
          style={styles.trashIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.cartList}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total Price:</Text>
            <Text style={styles.totalAmount}>${getCartTotal()}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgScreen,
    },
    emptyCart: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyCartText: {
      fontSize: 18,
      color: colors.grayText,
      marginTop: 10,
    },
    cartList: {
      padding: 15,
    },
    cartItem: {
      flexDirection: 'row',
      backgroundColor: colors.bgContainer,
      borderRadius: 12,
      marginBottom: 15,
      padding: 15,
      alignItems: 'center',
      shadowColor: colors.textColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cartItemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 15,
    },
    cartItemDetails: {
      flex: 1,
    },
    cartItemTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textColor,
      marginBottom: 8,
      lineHeight: 20,
    },
    cartItemPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.primaryColor,
      marginBottom: 12,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    quantityButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.bgScreen,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: colors.borderColor,
    },
    quantityButtonText: {
      fontSize: 18,
      fontWeight: '400',
      color: colors.textColor,
    },
    quantityText: {
      fontSize: 18,
      fontWeight: '700',
      color: colors.textColor,
      minWidth: 20,
      textAlign: 'center',
    },
    removeButton: {
      padding: 8,
      marginLeft: 10,
    },
    trashIcon: {
      width: 20,
      height: 20,
      tintColor: colors.red,
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      borderTopWidth: 0.5,
      borderTopColor: colors.borderColor,
      backgroundColor: colors.bgContainer,
      marginTop: 10,
    },
    totalText: {
      fontSize: 16,
      color: colors.grayText,
    },
    totalAmount: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.textColor,
    },
    checkoutButton: {
      backgroundColor: colors.primaryColor,
      padding: 16,
      marginHorizontal: 20,
      marginVertical: 20,
      borderRadius: 12,
      alignItems: 'center',
    },
    checkoutButtonText: {
      color: colors.whiteColor,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default CartScreen;
