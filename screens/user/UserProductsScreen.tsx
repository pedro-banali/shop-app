import React, { FC } from 'react';
import { FlatList, Platform, Button, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { ProductState } from '../../store/reducers/products.reducer';
import { Product } from '../../models/product.class';
import { ProductItem } from '../../components/shop/ProductItem';
import { NavigationNavigatorProps, NavigationParams } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products.actions';

interface Props {}

export const UserProductScreen: FC<Props & NavigationParams> &
  NavigationNavigatorProps = ({ navigation }) => {
  const userProducts = useSelector(({ product }: { product: ProductState }) =>
    Object.keys(product.userProducts).map(uPid => product.userProducts[uPid])
  );

  const editProductHandler = (productId: string) => {
    navigation.navigate('EditProduct', { productId });
  };

  const deleteHandler = (productId: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productActions.deleteProduct(productId));
        }
      }
    ]);
  };

  const dispatch = useDispatch();
  return (
    <FlatList
      data={userProducts}
      keyExtractor={userProducts => userProducts.id}
      renderItem={({ item }: { item: Product }) => (
        <ProductItem
          onSelect={() => {
            editProductHandler(item.id);
          }}
          image={item.imageUrl}
          price={item.price}
          title={item.title}
        >
          <Button
            color={Colors.darkBrown}
            title='Edit'
            onPress={() => {
              editProductHandler(item.id);
            }}
          />
          <Button
            color={Colors.alert}
            title='Delete'
            onPress={deleteHandler.bind(this, item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Your Products',
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
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title='Add'
        iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        onPress={() => {
          navigation.navigate('EditProduct');
        }}
      />
    </HeaderButtons>
  )
});
