import React, { FC } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { CartItem } from '../../store/reducers/cart.reducer';

interface Props {
  onRemove: (pid: string) => void;
  cartItem: CartItem;
  isAbleToDelete?: boolean;
}

export const CartItemComponent: FC<Props> = ({
  onRemove,
  cartItem,
  isAbleToDelete
}) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{cartItem.quantity} </Text>
        <Text style={styles.mainText}>{cartItem.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>{cartItem.totalPrice.toFixed(2)}</Text>
        {isAbleToDelete && (
          <TouchableOpacity
            onPress={() => onRemove(cartItem.id)}
            style={styles.deleteButton}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color='red'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
});
