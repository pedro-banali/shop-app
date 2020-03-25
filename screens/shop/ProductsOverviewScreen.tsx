import React, { FC } from 'react';
import { FlatList, View, Text, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { availableProductsAsList } from '../../store/selectors/products.selectors';
import { ProductItem } from '../../components/shop/ProductItem';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';
import * as cardActions from '../../store/actions/cart.actions';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';

export const ProductsOverviewScreen: FC<NavigationParams> &
  NavigationNavigatorProps = ({ navigation }) => {
  const products = useSelector(availableProductsAsList);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      keyExtractor={products => products.id}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onAddToCart={() => {
            dispatch(cardActions.addToCart(item));
          }}
          viewDetails={() => {
            navigation.navigate('ProductDetail', {
              productId: item.id,
              productTitle: item.title
            });
          }}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  };
};
