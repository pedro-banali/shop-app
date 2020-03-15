import React, { FC } from 'react';
import { FlatList, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { availableProductsAsList } from '../../store/selectors/products.selectors';

export const ProductsOverviewScreen: FC<any> = props => {
  const products = useSelector(availableProductsAsList);
  return (
    <FlatList
      data={products}
      keyExtractor={products => products.id}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  );
};
