"use client"
import callAPI from '../utils/callAPI/page.js';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// optimize search
import { debounce } from 'lodash';

// Redux hooks
import { useDispatch, useSelector } from 'react-redux';
// slices
import { addToCart } from "../redux/slices/cart/page.js";
import { setProducts } from '../redux/slices/products/page.js';

// toast messages
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const products = useSelector(state => state.products);

  useEffect(() => {
    callAPI('https://fakestoreapi.com/products')
      .then((data) => {
        dispatch(setProducts(data));
        setFilterProducts(data);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err);
        setLoad(false);
      });
  }, []);

  // Inside your component
  const debouncedSearchItem = debounce((searchTerm) => {
    setLoad(true);
  
    // If search term is empty, reset filter and load all products
    if (!searchTerm) {
      setFilterProducts(products);
      setLoad(false);
      return;
    }
  
    // Otherwise, filter products based on the search term
    const searchWords = searchTerm.toLowerCase().split(' '); 
    const filteredProducts = products[0].filter(product => {
      return searchWords.every(word =>
        product.title.toLowerCase().includes(word)
      );
    });
  
    setFilterProducts(filteredProducts);
    setLoad(false);
  }, 700);
  
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    debouncedSearchItem(searchTerm);
  };
  
  


  const add2Cart = (product) => {
    toast.success('Product added to cart');
    dispatch(addToCart({ product }));
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
                <button className="btn drop-shadow-md hover:drop-shadow-xl outline bg-green-500 h-10 self-end" onClick={() => add2Cart(product)}>Add to Cart</button>
              </div>
            ))}
          </main>
        ) : (
          <h1 align="center" className="text-blue-700 text-2xl">
            Loading...
          </h1>
        )}
        {!filterProducts.length && !load && <h1 align='center' className="text-blue-700 text-2xl">No products found</h1>}
      </div>
      <ToastContainer />
    </>
  );
}

