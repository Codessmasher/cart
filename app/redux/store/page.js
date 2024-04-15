import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../slices/products/page';
import cartReducer from '../slices/cart/page';

export const makeStore = () => {
  return configureStore({
    reducer:{
      products: productsReducer,
      cart: cartReducer,
    }
  })
}  
