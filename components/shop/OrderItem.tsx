import React, { FC, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Colors from '../../constants/Colors';
import moment from 'moment';
import { HashMap } from '../../shared/HashMap';
import { CartItem } from '../../store/reducers/cart.reducer';
import { CartItemComponent } from './CartItem';
import { Card } from '../UI/Card';

interface Props {
  amount: number;
  date: number;
  items: HashMap<CartItem>;
}

export const OrderItem: FC<Props> = ({ amount, date, items }) => {
  //   const newDate = new Date(date).toLocaleDateString('pt-BR', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   });
  const newDate = moment(new Date(date)).format('MMMM Do YYYY, hh:mm');
  const [showDetail, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{amount.toFixed(2)}</Text>
        {/* <Text style={styles.date}>{date}</Text> */}
        <Text style={styles.date}>{newDate}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetail ? 'Hide details' : 'Show details'}
        onPress={() => {
          setShowDetails(previousState => !previousState);
        }}
      />
      {showDetail && (
        <View style={styles.detailItems}>
          {Object.keys(items).map(cartId => (
            <CartItemComponent
              key={cartId}
              cartItem={items[cartId]}
              onRemove={() => {}}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888'
  },
  detailItems: {
    width: '100%'
  }
});
