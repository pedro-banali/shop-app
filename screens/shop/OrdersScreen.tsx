import React, { FC, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OrderState } from '../../store/reducers/order.reducer';
import {
  FlatList,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import { OrderItem } from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/order.actions';
import Colors from '../../constants/Colors';

interface Props {}

export const OrderScreen: FC<Props & NavigationParams> &
  NavigationNavigatorProps = (props) => {
  const orders = useSelector(({ orders }: { orders: OrderState }) =>
    Object.keys(orders.orders).map((key) => orders.orders[key])
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(orderActions.fetchOrders());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    loadOrders();
  }, [dispatch, loadOrders]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button title='Try again' onPress={loadOrders} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.green} />
      </View>
    );
  }

  if (!isLoading && orders.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No orders found, Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderItem
          amount={item.orderTotal}
          items={item.orderItems}
          date={item.orderDate}
        />
      )}
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
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
