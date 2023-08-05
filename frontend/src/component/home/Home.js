import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../Layout/MetaData";
import axios from "axios";

import Loader from "../Layout/Loader/Loader";
import { fetchProducts } from "../../redux/slice/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

  const dispatch=useDispatch()

  const {products,productsCount}=useSelector((state)=>state.product)



useEffect(()=>{

dispatch(fetchProducts())

},[])
  

  return (
    <>
      {false ? (
        <Loader />
      ) : (
        <>
          {" "}
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>

            <h2 className="homeHeading">Featured Products</h2>
           
          </div>
          <div className="container" id="container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </>
      )}
    </>
  );
};

export default Home;
