import React, { FC } from 'react';
import { View, FlatList, Platform } from 'react-native';

import { useSelector } from 'react-redux';
import { ProductState } from '../../store/reducers/products.reducer';
import { Product } from '../../models/product.class';
import { ProductItem } from '../../components/shop/ProductItem';
import { NavigationNavigatorProps, NavigationParams } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';

interface Props {}

export const UserProductScreen: FC<Props & NavigationParams> &
  NavigationNavigatorProps = props => {
  const userProducts = useSelector(({ product }: { product: ProductState }) =>
    Object.keys(product.userProducts).map(uPid => product.userProducts[uPid])
  );
  return (
    <FlatList
      data={userProducts}
      keyExtractor={userProducts => userProducts.id}
      renderItem={({ item }: { item: Product }) => (
        <ProductItem
          viewDetails={() => {}}
          onAddToCart={() => {}}
          image={item.imageUrl}
          price={item.price}
          title={item.title}
        />
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
  )
});
