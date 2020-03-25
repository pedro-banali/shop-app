import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { OrderScreen } from '../screens/shop/OrdersScreen';
import { CartScreen } from '../screens/shop/CartScreen';
import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { ProductsOverviewScreen } from '../screens/shop/ProductsOverviewScreen';

import Colors from '../constants/Colors';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor:
    Platform.OS === 'android' ? Colors.contrastPrimary : Colors.primary
};

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverviewScreen,
      navigationOptions: {
        headerTitle: 'All Products'
      }
    },
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrderScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductNavigator,
    Orders: OrdersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(ShopNavigator);
