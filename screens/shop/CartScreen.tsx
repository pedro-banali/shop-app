import React, { FC } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CartState, CartItem } from '../../store/reducers/cart.reducer';
import Colors from '../../constants/Colors';
import { CartItemComponent } from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart.actions';
import * as ordersActions from '../../store/actions/order.actions';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';
import { Card } from '../../components/UI/Card';

export const CartScreen: FC<NavigationParams> &
  NavigationNavigatorProps = () => {
  const cartTotalAmount = useSelector(
    ({ cart }: { cart: CartState }) => cart.totalAmount
  );

  const [cartItems, hashedCartItems, totalAmount] = useSelector(
    ({ cart }: { cart: CartState }) => [
      Object.keys(cart.items)
        .map(id => cart.items[id])
        .sort((a, b) => (a.id > b.id ? 1 : -1)),
      cart.items,
      cart.totalAmount
    ]
  );
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}>
            ${Math.round((cartTotalAmount * 100) / 100).toFixed(2)}
          </Text>
        </Text>
        <Button
          title='Order now'
          color={Colors.green}
          onPress={() => {
            dispatch(ordersActions.addOrder(hashedCartItems, totalAmount));
          }}
          disabled={cartItems.length === 0}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }: { item: CartItem }) => (
          <CartItemComponent
            isAbleToDelete
            cartItem={item}
            onRemove={(pid: string) => {
              dispatch(cartActions.removeFromCart(pid));
            }}
          />
        )}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20,
    padding: 20,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.darkBrown
  }
});
