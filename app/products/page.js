"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { debounce } from 'lodash';

import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/cart/page.js";  



export default function products() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(1);
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const dispatch = useDispatch(); // Get the dispatch function

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilterProducts(data);
        setLoad(0);
      })
      .catch((err) => {
        console.log(err);
        setLoad(0);
      });
  }, []);

  // Debounce the search functionality for 500 milliseconds
  const debouncedSearchItem = debounce((searchTerm) => {
    setLoad(1);

    if (searchTerm === '') {
      setFilterProducts(products);
      setLoad(0);
      return;
    }

    const searchWords = searchTerm.toLowerCase().split(' ');
    const filteredProducts = products.filter(product => {
      return searchWords.some(word =>
        product.title.toLowerCase().includes(word)
      );
    });
    setFilterProducts(filteredProducts);
    setLoad(0);
  }, 500);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    debouncedSearchItem(searchTerm);
  };

  const add2Cart = (id) => {
    // Dispatch the addToCart action with the product ID
    dispatch(addToCart({ id }));
    // Redirect to the cart page
    router.push(`/cart`);
  };

  return (
    <>
      <div className="container">
        <nav className="nav flex justify-between m-8">
          <div className="logo">MyCart</div>
          <div className="searchbar">
            <input
              type="text"
              placeholder="Search for products"
              className="mr-2 rounded-full outline outline-2 outline-offset-2 p-1 sm:w-80 w-20"
              value={search}
              onChange={handleSearchChange}
            />
            <button className="p-1 text-blue-500" onClick={() => router.push('/cart')}>
              CART
            </button>
          </div>
        </nav>
        {!load ? (
          <main className="products m-8  drop-shadow-xl grid sm:grid-cols-4 gap-2">
            {filterProducts.map((product, index) => (
              <div key={index} className="outline product rounded overflow-hidden shadow-sm grid grid-cols-1 p-2  justify-center">
                <img src={product.image} alt={product.title} className="object-cover min-w-40 min-h-40 max-w-40 max-h-40" />
                <div className="flex flex-col justify-end p-2">
                  <h3 className='text-yellow-500'>{product.title}</h3>
                  <p> 💲{product.price}</p>
                </div>
                <button className="btn drop-shadow-md hover:drop-shadow-xl outline bg-green-500 h-10 self-end" onClick={() => add2Cart(product.id)}>Add to Cart</button>
              </div>
            ))}
          </main>
        ) : (
          <h1 align="center" className="text-blue-700 text-2xl">
            Loading...
          </h1>
        )}
        {!filterProducts.length && <h1 align='center' className="text-blue-700 text-2xl">No products found</h1>}
      </div>
      <ToastContainer />
    </>
  );
}
