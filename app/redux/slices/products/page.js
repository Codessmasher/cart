import { createSlice } from '@reduxjs/toolkit';

const ProductsSlice = createSlice({
  name: 'products',
  initialState:[],
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
  },
});

export const { setProducts } = ProductsSlice.actions;

export default ProductsSlice.reducer;
