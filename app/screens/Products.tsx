import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { fetchProducts } from '../services/api';
import { ScreenProps } from '../types/navigation';
import { Product } from '../types/product';
import { useCartStore } from '../store/CartStore';
import { colors } from '../utils/Constants';
import { useCartNavigation } from '../hooks/useCartNavigation';

const Products = ({ navigation }: ScreenProps<'Products'>) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);

  const { addToCart, cartItems, loadCartFromStorage, isLoaded } = useCartStore();

  useCartNavigation();

  useEffect(() => {
    loadProducts();
    if (!isLoaded) {
      loadCartFromStorage();
    }
  }, [loadCartFromStorage, isLoaded]);

  const loadProducts = async () => {
    const data: Product[] = await fetchProducts();
    setProducts(data);

    const uniqueCategories: string[] = [
      'All',
      ...new Set(data.map((product: Product) => product.category.name)),
    ];
    setCategories(uniqueCategories);
    setFilteredProducts(data);
    setLoading(false);
  };

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        product => product.category.name === category,
      );
      setFilteredProducts(filtered);
    }
  };

  const refreshHandler = async () => {
    setRefreshing(true);
    await loadProducts();
    filterByCategory(selectedCategory);
    setRefreshing(false);
  };

  const isItemInCart = (productId: number) => {
    return cartItems.some(item => item.id === productId);
  };

  const renderCategoryButton = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.selectedCategoryButton,
      ]}
      onPress={() => filterByCategory(item)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === item && styles.selectedCategoryButtonText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: Product }) => {
    const itemInCart = isItemInCart(item.id);

    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() =>
          navigation.navigate('ProductDetail', { productId: item.id })
        }
      >
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <TouchableOpacity
            style={[styles.addButton, itemInCart && styles.addedButton]}
            onPress={() => addToCart(item)}
            disabled={itemInCart}
          >
            <Text
              style={[
                styles.addButtonText,
                itemInCart && styles.addedButtonText,
              ]}
            >
              {itemInCart ? 'Added' : '+ Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryColor} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategoryButton}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        />
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.productsContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshHandler}
            progressViewOffset={50}
            colors={[colors.primaryColor]}
            tintColor={colors.primaryColor}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgScreen,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    backgroundColor: colors.bgContainer,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  categoriesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: colors.textColor,
  },
  categoriesContent: {
    paddingHorizontal: 5,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.bgLight,
    marginHorizontal: 5,
  },
  selectedCategoryButton: {
    backgroundColor: colors.primaryColor,
  },
  categoryButtonText: {
    fontSize: 14,
    color: colors.textColor,
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: colors.bgContainer,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  productsContent: {
    padding: 10,
  },
  productCard: {
    width: '48%',
    backgroundColor: colors.bgContainer,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: colors.textColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: colors.textColor,
    lineHeight: 18,
  },
  productPrice: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primaryColor,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 12,
    color: colors.grayText,
    marginBottom: 12,
  },
  addButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.bgLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addedButton: {
    backgroundColor: colors.bgLight,
    opacity: 0.6,
  },
  addButtonText: {
    color: colors.primaryColor,
    fontSize: 14,
    fontWeight: '600',
  },
  addedButtonText: {
    color: colors.grayText,
  },
  cartIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
    paddingVertical: 12,
  },
  cartIconImage: {
    width: 24,
    height: 24,
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
});

export default Products;
