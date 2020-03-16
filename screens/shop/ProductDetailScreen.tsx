import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';
import { useSelector } from 'react-redux';
import { ProductState } from '../../store/reducers/products.reducer';

export const ProductDetailScreen: FC<NavigationParams> &
  NavigationNavigatorProps = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector(
    ({ product }: { product: ProductState }) =>
      product.availableProducts[productId]
  );
  return (
    <View>
      <Text>{selectedProduct.title}</Text>
      <Text>The Product Detail Screen</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({});
