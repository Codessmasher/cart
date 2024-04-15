"use client"
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '../../redux/hooks/page.js';
import { addToCart } from "../../redux/slices/cart/page.js";
import { setProducts } from "@/app/redux/slices/products/page";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const { pid } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [imageClicked, setImageClicked] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [product, setProduct] = useState(null); // State to store the matched product
  const cartItems = useAppSelector(state => state.cart.value);


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data));
        const matchedProduct = data.find(item => item.id == pid); // Find the product with matching id
        if (matchedProduct) {
          setProduct(matchedProduct);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pid]); // Fetch data whenever pid changes


  useEffect(() => {
    const itemCount = cartItems.reduce((total) => total + 1, 0);
    document.title = `MyCart (${itemCount})`;
  }, [cartItems]);


  const toggleImageSize = () => {
    setImageClicked(!imageClicked);
  };

  // cart addition
  const add2Cart = (product) => {
    toast.success('Product added to cart');
    dispatch(addToCart({ product }));
    setCartAdded(true);
  };

  return (
    <>
      <div className="w-100 flex justify-end">
        <img src="https://img.icons8.com/?size=30&id=84926&format=png" alt="cart" onClick={() => router.push('/cart')} className='cursor-pointer m-5' />
      </div>
      <main className="grid items-center">
        {product ? ( // Check if product is found
          <div className="grid m-6 sm:grid-cols-2 items-center sm:justify-between">
            <div className="sm:relative max-w-[500px] max-h-[500px]  sm:w-[500px] sm:h-[500px]">
              <img
                src={product.image}
                alt="productimg"
                className="sm:absolute"
                style={{
                  mixBlendMode: "multiply",
                  cursor: imageClicked ? "zoom-out" : "zoom-in",
                  width: imageClicked ? "90%" : "60%",
                  transition: "transform 0.3s ease-in-out",
                  top: "49px",
                  left: "20px",
                }}
                onClick={toggleImageSize}
              />
            </div>
            <div key={product.id} className="bg-orange-100 grid items-center justify-center p-5 max-w-[500px] max-h-[500px]">
              <h1 className="text-green-700">{product.title}</h1>
              <h2>
                Rating <span className="text-red-500 text-xl">{product.rating?.rate}</span> as of Total{" "}
                <span className="text-pink-400 text-xl">{product.rating?.count}</span>
              </h2>
              <p className="min-w-[250px] outline outline-1 p-1">{product.description}</p>
              <button className="m-1 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">💲{product.price}</button>
              {!cartAdded ?
                <button className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => add2Cart(product)}>Add To Cart</button> :
                <button className="m-1 bg-green-500 text-white font-bold py-2 px-4 rounded" disabled>✔️ Added To Cart</button>
              }
            </div>
          </div>
        ) : (
          <h1 align='center' className="text-2xl m-6">Loading...</h1>
        )}
        <ToastContainer />
      </main>

    </>
  );
};

export default Products;
