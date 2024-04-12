"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "@/app/redux/slices/products/page";

const Products = () => {
  const { pid } = useParams();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [imageClicked, setImageClicked] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${pid}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleImageSize = () => {
    setImageClicked(!imageClicked);
  };

  return (
    <main className="grid items-center">
      {Object.keys(products).length > 0 ? (
        <div className="grid m-6 sm:grid-cols-2 items-center sm:justify-between">
          <div className="sm:relative max-w-[500px] max-h-[500px]  sm:w-[500px] sm:h-[500px]">
            <img
              src={products.image}
              alt="productimg"
              className="sm:absolute"
              style={{
                mixBlendMode: "multiply",
                cursor: imageClicked ? "zoom-out" : "zoom-in",
                width: imageClicked ? "100%" : "60%",
                transition: "transform 0.3s ease-in-out",
                top: "67px",
                left: "40px",
              }}
              onClick={toggleImageSize}
            />
          </div>
          <div key={products.id} className="bg-orange-100 grid items-center justify-center p-5 max-w-[500px] max-h-[500px]">
            <h1 className="text-green-700">{products.title}</h1>
            <h2>
              Rating <span className="text-red-500 text-xl">{products.rating?.rate}</span> as of Total{" "}
              <span className="text-pink-400 text-xl">{products.rating?.count}</span>
            </h2>
            <p className="min-w-[250px] outline outline-1 p-1">{products.description}</p>
            <button className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">💲{products.price}</button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  );
};

export default Products;
