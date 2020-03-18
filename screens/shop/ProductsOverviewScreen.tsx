import React, { FC } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { availableProductsAsList } from '../../store/selectors/products.selectors';
import { ProductItem } from '../../components/shop/ProductItem';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';
import * as cardActions from '../../store/actions/cart.actions';

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
