import React, { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import Category from "../../components/Category/Category";
import "./Home.scss";
import Product from "../../components/Product/Product";
import { axiosClient } from "../../utils/axiosClient";
import { useSelector } from "react-redux";
function Home() {

  const [productData, setProductData] = useState(null);

  const categoriesData = useSelector((state) => state.categorySlice.categories);

  async function fetchProducts() {
    const response = await axiosClient.get(
      "/products?filters[isTopPick][$eq]=true&populate=image"
    );
    setProductData(response?.data?.data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="Home">
      <Hero />
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Shop By Category</h2>
          <p className="subheading">
            Shop from the best , our Bestseller collection.
          </p>
        </div>
        <div className="content">
          {categoriesData?.map((item) => (
            <Category key={item.id} item={item} />
          ))}
        </div>
      </section>
      <section className="collection container">
        <div className="info">
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">Paper back , Original Publications.</p>
        </div>
        <div className="content">
         {
          productData?.map(product =>  <Product key={product.id} product={product} />)
         }
          
        </div>
      </section>
    </div>
  );
}

export default Home;
