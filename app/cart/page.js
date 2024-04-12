"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { removeFromCart } from '../redux/slices/cart/page.js'; // Assuming you have a removeFromCart action creator
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cartpage = () => {
  const cartItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const itemCount = cartItems.reduce((total) => total + 1, 0);
    document.title = `MyCart (${itemCount})`;
  }, [cartItems]);

  const handleRemoveFromCart = (productId) => {
    toast.warning('Product Removed from Cart')
    dispatch(removeFromCart(productId)); // Dispatch the removeFromCart action with the product ID
  };

  return (
    <>
      <div className="w-100 flex justify-end m-6 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 24 24" onClick={() => router.push('/')}>
          <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
        </svg>
      </div>
      {cartItems.length === 0 && <h1 align='center' className='text-2xl text-red-800 m-8'>No Item is Added on the cart</h1>}
      <main className='grid sm:grid-cols-3 m-5 gap-2'>
        {cartItems.map((item, index) => {
          const product = item.product; // Accessing the product object
          return (
            <div key={index} className="outline product rounded overflow-hidden shadow-sm grid grid-cols-1 p-2 justify-center">
              <img src={product.image} alt={product.title} className="object-fit min-w-40 min-h-40 max-w-40 max-h-40" />
              <div className="flex flex-col justify-end p-2">
                <h3 className='text-yellow-500'>{product.title}</h3>
                <p> 💲{product.price}</p>
                <button onClick={() => handleRemoveFromCart(product.id)} className="self-start outline-3 p-2 text-red-500">Remove</button>
              </div>
            </div>
          );
        })}
        <ToastContainer />
      </main>
    </>

  )
}

export default Cartpage;
