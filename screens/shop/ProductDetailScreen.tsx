import React, { FC } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { ProductState } from '../../store/reducers/products.reducer';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors';
import * as cardActions from '../../store/actions/cart.actions';

export const ProductDetailScreen: FC<NavigationParams> &
  NavigationNavigatorProps = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector(
    ({ product }: { product: ProductState }) =>
      product.availableProducts[productId]
  );
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.mildBrown}
          title='Add to Cart'
          onPress={() => {
            dispatch(cardActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
  },
  price: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});
