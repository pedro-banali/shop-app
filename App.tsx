import React, { useState } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import productReducer from './store/reducers/products.reducer';
import ShopNavigator from './navigation/ShopNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import cartReducer from './store/reducers/cart.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import orderReducer from './store/reducers/order.reducer';

const rootReducer = combineReducers({
  product: productReducer,
  cart: cartReducer,
  orders: orderReducer
});
// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
