"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../redux/slices/cart/page.js";
import { setProducts } from '../redux/slices/products/page.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Products() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [load, setLoad] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const products = useSelector(state => state.products);
  const cartItems = useSelector(state => state.cart);


  // first time products fetch
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data.map(product => ({ ...product, addedToCart: false })))); // Add addedToCart property to each product
        setFilterProducts(data.map(product => ({ ...product, addedToCart: false })));
        setLoad(false);
      })
      .catch((err) => { 
        setLoad(false);
      });
  }, []);

  //Custom debounce search
  useEffect(() => {
    const timer = setTimeout(() => { 
      debouncedSearchItem(search);
    }, 600); // Adjust debounce delay as needed

    return () => clearTimeout(timer);
  }, [search]);


  
  useEffect(() => {
    const itemCount = cartItems.reduce((total) => total + 1, 0);
    document.title = `MyCart (${itemCount})`;
  }, [cartItems]);



  const debouncedSearchItem = (searchTerm) => {
    setLoad(true); 
    if (searchTerm === '') {
      setFilterProducts(products);
      setLoad(false);
      return;
    }
    const searchWords = searchTerm.toLowerCase().split(' ');
    const filteredProducts = products.filter(product =>
      searchWords.every(word => product.title.toLowerCase().includes(word))
    );
    setFilterProducts(filteredProducts);
    setLoad(false);
  };
   
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // cart addition
  const add2Cart = (product) => {
    toast.success('Product added to cart');
    dispatch(addToCart({ product }));
    const updatedProducts = filterProducts.map(p =>
      p.id === product.id ? { ...p, addedToCart: true } : p
    );
    setFilterProducts(updatedProducts);
  };

  return (
    <>
      <nav className="nav flex justify-between sm:m-8 p-4 bg-teal-500">
        <div className="logo text-3xl">MyCart</div>
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search for products"
            className="mr-2 rounded-full outline outline-2 outline-offset-2 p-1 sm:w-80 w-20"
            value={search}
            onChange={handleSearchChange}
          /> 
        </div>
        <img src="https://img.icons8.com/?size=40&id=84926&format=png" alt="cart" onClick={() => router.push('/cart')} className='cursor-pointer'/>
      </nav>
      <div className="container grid justify-center items-center" style={{minWidth:"100%"}}>
        {!load ? (
          <main className="products m-8 grid sm:grid-cols-4 gap-2">
            {filterProducts.map((product, index) => (
              <div key={index} className="outline product rounded shadow-sm grid grid-cols-1 p-2 justify-center min-h-[25rem] max-h-[25rem]">
                <img src={product.image} alt={product.title} className="object-fit min-w-40 min-h-40 max-w-40 max-h-40" />
                <div className="flex flex-col justify-end p-2">
                  <h3 className='text-black-900  font-bold '>{product.title}</h3>
                  <p className=' text-blue-500 font-bold '> 💲{product.price}</p>
                </div>
                <div className="grid rows-2">
                  <button className="self-end bg-yellow-500 h-12 font-bold py-2 px-4 rounded " onClick={() => router.push(`/products/${product.id}`)}>View</button>
                  <button className={`self-end text-white-500 h-12 font-bold py-2 px-4 rounded ${product.addedToCart ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"}`} onClick={() => add2Cart(product)} disabled={product.addedToCart}>{product.addedToCart ? "✔️ Added To Cart" : "Add To Cart"}</button>
                </div>
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
