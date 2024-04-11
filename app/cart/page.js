"use client"
import { useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../redux/store/page.js'; // Assuming you have configured your Redux store in this file
import Cart from '../redux/cart/page.js';

const Cartpage= () => {
  const cartItem = useSelector(state => state.cart);
  console.log(cartItem);
  <Provider store={store}>
      {/* <Cart />   */}
  </Provider>
}

export default Cartpage