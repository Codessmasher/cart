"use client"
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../redux/slices/cart/page.js'; // Assuming you have a removeFromCart action creator

const Cartpage = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId)); // Dispatch the removeFromCart action with the product ID
  };

  return (
    <main>
      {cartItems.length === 0 && <h1 align='center'>No Item is Added on the cart</h1>}
      {cartItems.map((item, index) => {
        const product = item.product; // Accessing the product object
        return (
          <div key={index} className="outline product rounded overflow-hidden shadow-sm grid grid-cols-1 p-2 justify-center">
            <img src={product.image} alt={product.title} className="object-cover min-w-40 min-h-40 max-w-40 max-h-40" />
            <div className="flex flex-col justify-end p-2">
              <h3 className='text-yellow-500'>{product.title}</h3>
              <p> 💲{product.price}</p>
              <button onClick={() => handleRemoveFromCart(product.id)} className="btn text-red-500">Remove</button>
            </div>
          </div>
        );
      })}
    </main>  
  );
}

export default Cartpage;
