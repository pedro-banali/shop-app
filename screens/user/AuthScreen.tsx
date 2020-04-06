import React, { FC, useReducer, useCallback, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Button } from 'react-native';
import { Card } from '../../components/UI/Card';
import { ScrollView } from 'react-native-gesture-handler';
import { Input } from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { NavigationParams, NavigationNavigatorProps } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth.actions';
import { useDispatch } from 'react-redux';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

interface FormState {
  inputValues: {
    email: string;
    password: string;
  };
  inputValidities: {
    email: boolean;
    password: boolean;
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

export const AuthScreen: FC<Props & NavigationParams> &
  NavigationNavigatorProps = (props) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const authHandler = () => {
    let action;
    if (isLogin) {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    dispatch(action);
  };

  const inputChangeHandler = useCallback(
    (input: string, value: string, isValid: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        payload: { value, isValid, input },
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient
        style={styles.gradient}
        colors={[Colors.primary, Colors.contrastPrimary]}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id='email'
              label='E-mail'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email address.'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorText='Please enter a password.'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <View style={styles.buttonContainer}>
              <Button
                title={isLogin ? 'Login' : 'Sign Up'}
                color={Colors.green}
                onPress={authHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to Sign up ${isLogin ? 'Sign Up' : 'Login'}`}
                color={Colors.mildBrown}
                onPress={() => {
                  setIsLogin((prevState) => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 24,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
  },
});
