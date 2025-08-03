import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { ScreenProps } from '../types/navigation';
import { fetchProductDetails } from '../services/api';
import { Product } from '../types/product';
import { useCartStore } from '../store/CartStore';
import { colors } from '../utils/Constants';
import { useCartNavigation } from '../hooks/useCartNavigation';

const ProductDetail = ({ route }: ScreenProps<'ProductDetail'>) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCartStore();

  useCartNavigation();

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const imageWidth = 390;
    const index = Math.round(contentOffsetX / imageWidth);
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductDetails(productId);
      setProduct(data);
    };

    loadProduct();
    setLoading(false);
  }, [productId]);

  if (loading || !product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.imageScrollContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {product.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.productImage}
          />
        ))}
      </ScrollView>

      {product.images.length > 1 && (
        <View style={styles.paginationContainer}>
          {product.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                currentImageIndex === index && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      )}

      <ScrollView style={styles.productDetailsContainer}>
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <View style={styles.priceRatingContainer}>
            <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(product)}
          >
            <Image
              source={require('../assets/images/cart-outline.png')}
              style={styles.cartBtn}
            />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgContainer,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageScrollContainer: {
    height: 0,
  },
  productImage: {
    width: 370,
    height: 250,
    resizeMode: 'contain',
    margin: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgContainer,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: colors.primaryColor,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  productDetailsContainer: {
    flex: 1,
    marginTop: 42,
  },
  productDetails: {
    paddingHorizontal: 20,
  },
  productTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.textColor,
  },
  priceRatingContainer: {
    marginBottom: 20,
  },
  productPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primaryColor,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    color: colors.grayText,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.textColor,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
    color: colors.grayText,
  },
  addToCartButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primaryColor,
    padding: 18,
    borderRadius: 25,
    marginBottom: 20,
    gap: 10,
  },
  cartBtn: {
    width: 24,
    height: 24,
    tintColor: colors.bgContainer,
  },
  addToCartText: {
    color: colors.bgContainer,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartIcon: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  cartIconImage: {
    width: 24,
    height: 24,
  },
  cartCount: {
    marginLeft: 5,
    fontSize: 16,
  },
});

export default ProductDetail;
