import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { NavigationNavigatorProps, NavigationParams } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products.actions';
import { ProductState } from '../../store/reducers/products.reducer';

interface Props {}

export const EditProductScreen: FC<Props & NavigationParams> &
  NavigationNavigatorProps = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const editedProduct = useSelector(
    ({ product }: { product: ProductState }) =>
      product.availableProducts[productId]
  );

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ''
  );
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  );

  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productActions.updateProduct({
          id: productId,
          title,
          description,
          imageUrl
        })
      );
    } else {
      const princeNumber = parseFloat(price);
      dispatch(
        productActions.createProduct({
          title,
          description,
          imageUrl,
          price: princeNumber
        })
      );
    }
    navigation.goBack();
  }, [dispatch, productId, price, title, description, imageUrl]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}> Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}> Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}> Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}> Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submit = navigation.getParam('submit');
  return {
    headerTitle: navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add'
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submit}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  }
});
