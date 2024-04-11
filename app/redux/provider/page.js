"use client"
import { Provider } from 'react-redux';
import store from '../store/page.js';  

const provider = ({children}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default provider