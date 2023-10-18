import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Categories.scss";
import Product from "../../components/Product/Product";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";


function Categories() {

  const navigate = useNavigate();
  const params = useParams();
  const [categoryId, setCategoryId] = useState("");
  const categories = useSelector((state) => state.categorySlice.categories);
  const [products, setProducts] = useState(null);
 

  const sortOption = [
    {
      value: "price-low to high",
      sort: "price",
    },
    {
      value: "newest-first",
      sort: "createdAt",
    },
  ];

  const [sortBy , setSortBy] = useState(sortOption[0].sort);

  async function fetchProducts() {
    if (params.categoryId) {
      const response = await axiosClient.get(
        `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      );
      setProducts(response.data.data);
    } else {
      const response = await axiosClient.get(`/products?populate=image&sort=${sortBy}`);
      setProducts(response.data.data);
    }
  }

  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchProducts();
  }, [params,sortBy]);

  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }

  
  
  return (
    <div className="Categories">
      <div className="container">
        <div className="header">
          <div className="info">
            <h2>Explore all books and publications</h2>

            <p>India's largest collection of books and novels</p>
          </div>
          <div className="sort-by">
            <div className="sort-by-container">
              <p className="sort-by-text">Sort By</p>
              <select className="select-sort-by" onChange={(e)=>setSortBy(e.target.value)} name="sort-by" id="sort-by">
                {sortOption.map((item) => (
                  <option key={item.sort} value={item.sort}>
                    {item.value}
                  </option>
                ))}
               
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="filter-box">
            <div className="category-filter">
              <h3>Category</h3>
              {categories?.map((item) => (
                <div className="filter-radio" key={item.id}>
                  <input
                    checked={item.attributes.key === categoryId}
                    onChange={updateCategory}
                    name="category"
                    type="radio"
                    value={item.attributes.key}
                    id={item.id}
                    
                  />
                  <label htmlFor={item.id}>{item?.attributes?.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="product-box">
            {products?.map((item) => (
              <Product key={item.key} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
