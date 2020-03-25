import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { OrderState } from '../../store/reducers/order.reducer';
import { FlatList, Text, Platform } from 'react-native';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';

interface Props {}

export const OrderScreen: FC<Props & NavigationParams> &
  NavigationNavigatorProps = props => {
  const orders = useSelector(({ orders }: { orders: OrderState }) =>
    Object.keys(orders.orders).map(key => orders.orders[key])
  );
  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <Text>{item.orderTotal}</Text>}
    />
  );
};

OrderScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Orders',
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
