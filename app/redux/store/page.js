import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/products/page';
import cartReducer from '../slices/cart/page';

const store = configureStore({
  reducer:{
    products: productsReducer,
    cart: cartReducer,
  }
});

export default store;
