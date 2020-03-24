import React, { FC } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CartState, CartItem } from '../../store/reducers/cart.reducer';
import Colors from '../../constants/Colors';
import { CartItemComponent } from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart.actions';

export const CartScreen: FC = () => {
  const cartTotalAmount = useSelector(
    ({ cart }: { cart: CartState }) => cart.totalAmount
  );

  const cartItems = useSelector(({ cart }: { cart: CartState }) =>
    Object.keys(cart.items)
      .map(id => cart.items[id])
      .sort((a, b) => (a.id > b.id ? 1 : -1))
  );
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:<Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button
          title='Order now'
          color={Colors.green}
          onPress={() => {}}
          disabled={cartItems.length === 0}
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }: { item: CartItem }) => (
          <CartItemComponent
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
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.darkBrown
  }
});
