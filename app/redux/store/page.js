import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import productsReducer from '../products/page.js';
import cartReducer from '../cart/page.js'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
