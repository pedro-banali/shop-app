import React, { FC, useEffect, useState } from 'react';
import {
  FlatList,
  View,
  Text,
  Platform,
  Button,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { availableProductsAsList } from '../../store/selectors/products.selectors';
import { ProductItem } from '../../components/shop/ProductItem';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';
import * as cardActions from '../../store/actions/cart.actions';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products.actions';

export const ProductsOverviewScreen: FC<NavigationParams> &
  NavigationNavigatorProps = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector(availableProductsAsList);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);

      await dispatch(productActions.fetchProducts());
      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  const selectItemHandler = (id: string, title: string) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title
    });
  };

  if (isLoading) {
    <View style={styles.centered}>
      <ActivityIndicator size='large' color={Colors.green} />
    </View>;
  }

  if (!isLoading && products.length === 0) {
    <View style={styles.centered}>
      <Text>No products found, Maybe start adding some!</Text>
    </View>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={products => products.id}
      renderItem={({ item }) => (
        <ProductItem
          title={item.title}
          price={item.price}
          image={item.imageUrl}
          onSelect={() => selectItemHandler(item.id, item.title)}
        >
          <Button
            color={Colors.darkBrown}
            title='View Details'
            onPress={() => selectItemHandler(item.id, item.title)}
          />
          <Button
            color={Colors.green}
            title='To Cart'
            onPress={() => {
              dispatch(cardActions.addToCart(item));
            }}
          />
        </ProductItem>
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
