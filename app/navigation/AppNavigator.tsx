import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import Products from '../screens/Products';
import ProductDetail from '../screens/ProductDetails';
import CartScreen from '../screens/Cart';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen 
          name="Products"
          component={Products}
          options={{ title: 'Our Products' }}
        />
        <Stack.Screen 
          name="ProductDetail"
          component={ProductDetail}
          options={{ title: 'Product Details' }}
        />
        <Stack.Screen 
          name="Cart"
          component={CartScreen}
          options={{ title: 'Your Cart' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator;
