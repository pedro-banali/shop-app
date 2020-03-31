import React, { FC, useReducer, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TextInputProps
} from 'react-native';
import { Product } from '../../models/product.class';

interface Props {
  id: string;
  label: string;
  errorText: string;
  onInputChange: (id: string, value: string, isValid: boolean) => void;
  initialValue?: string;
  initiallyValid?: boolean;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
}

interface InputState {
  value: string;
  isValid: boolean;
  touched: boolean;
}
interface InputAction {
  type: string;
  payload: Partial<{ value: string; isValid: boolean; touched: boolean }>;
}

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state: InputState, action: InputAction) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.payload.value,
        isValid: action.payload.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

export const Input: FC<Props & TextInputProps> = ({
  id,
  label,
  errorText,
  onInputChange,
  initialValue,
  initiallyValid,
  required,
  email,
  min,
  max,
  minLength,
  ...props
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initiallyValid,
    touched: false
  });

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange]);

  const textChangeHandler = (text: string) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && parseInt(text) < min) {
      isValid = false;
    }
    if (max != null && parseInt(text) > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }
    dispatch({
      type: INPUT_CHANGE,
      payload: { value: text, isValid }
    });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR, payload: {} });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
  errorContainer: {
      marginVertical: 5,
  },
  errorText: {
      fontFamily: 'open-sans',
      color: 'red',
      fontSize: 14
  }
});
