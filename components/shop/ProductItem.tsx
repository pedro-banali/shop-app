import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Platform,
  TouchableNativeFeedback
} from 'react-native';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ProductItem: FC<{
  image: string;
  title: string;
  price: number;
  onSelect: () => void;
}> = ({ image, title, price, onSelect, children }) => {
  let TouchableWorkaround = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableWorkaround = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableWorkaround onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>$ {price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{children}</View>
          </View>
        </TouchableWorkaround>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: '#000',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  }
});
