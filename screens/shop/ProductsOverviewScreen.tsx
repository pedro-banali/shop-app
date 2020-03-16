import React, { FC } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { availableProductsAsList } from '../../store/selectors/products.selectors';
import { ProductItem } from '../../components/shop/ProductItem';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';

export const ProductsOverviewScreen: FC<NavigationParams> &
  NavigationNavigatorProps = ({ navigation }) => {
  const products = useSelector(availableProductsAsList);
  return (
    <FlatList
      data={products}
      keyExtractor={products => products.id}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onAddToCart={() => {}}
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
