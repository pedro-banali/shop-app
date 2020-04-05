import React, { FC, useCallback, useEffect, useReducer, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NavigationNavigatorProps, NavigationParams } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { CustomHeaderButton } from '../../components/UI/HeaderButton';
import * as productActions from '../../store/actions/products.actions';
import { ProductState } from '../../store/reducers/products.reducer';
import { Input } from '../../components/UI/Input';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

interface FormState {
  inputValues: {
    title: string;
    imageUrl: string;
    description: string;
    price: string;
  };
  inputValidities: {
    title: boolean;
    imageUrl: boolean;
    description: boolean;
    price: boolean;
  };
  formIsValid: boolean;
}

const formReducer = (
  state: FormState,
  action: {
    type: string;
    payload: { value: string; isValid: boolean; input: string };
  }
) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.payload.input]: action.payload.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.payload.input]: action.payload.isValid,
    };
    let updatedFormIsValid = true;
    Object.keys(updatedValidities).forEach((key) => {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    });
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

interface Props {}

export const EditProductScreen: FC<Props & NavigationParams> &
  NavigationNavigatorProps = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const productId = navigation.getParam('productId');

  const editedProduct = useSelector(
    ({ product }: { product: ProductState }) =>
      product.availableProducts[productId]
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      description: editedProduct ? editedProduct.description : '',
      price: '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!!', 'Please check the errors in the form', [
        { text: 'Okay' },
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (editedProduct) {
        await dispatch(
          productActions.updateProduct({
            id: productId,
            title: formState.inputValues.title,
            description: formState.inputValues.description,
            imageUrl: formState.inputValues.imageUrl,
          })
        );
      } else {
        const princeNumber = parseFloat(formState.inputValues.price);
        await dispatch(
          productActions.createProduct({
            title: formState.inputValues.title,
            description: formState.inputValues.description,
            imageUrl: formState.inputValues.imageUrl,
            price: princeNumber,
          })
        );
      }
      navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, productId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (input: string, value: string, isValid: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        payload: { value, isValid, input },
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color={Colors.green} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id='title'
            label='Title'
            errorText='Please enter a valid title!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id='imageUrl'
            label='Image URL'
            errorText='Please enter a valid image url!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />
          {!editedProduct && (
            <Input
              id='price'
              label='Price'
              errorText='Please enter a valid price!'
              keyboardType='decimal-pad'
              returnKeyType='next'
              onInputChange={inputChangeHandler}
              required
              min={0}
            />
          )}
          <Input
            id='description'
            label='Description'
            errorText='Please enter a valid description!'
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
