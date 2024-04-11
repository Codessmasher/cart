"use client"

import { Provider } from 'react-redux';
import store from './redux/store/page.js';  
import Products from './products/page.js' 

const home = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Products/>
      <Component {...pageProps} />
    </Provider>
  )
}

export default home