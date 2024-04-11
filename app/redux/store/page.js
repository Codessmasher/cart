import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/products/page.js';
import cartReducer from '../slices/cart/page.js'
 
const store = configureStore({
  reducer:{
    products: productsReducer,
    cart: cartReducer,
  }
});

export default store;
