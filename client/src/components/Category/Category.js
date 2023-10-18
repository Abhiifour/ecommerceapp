import React from "react";
import "./Category.scss";
import { useNavigate } from "react-router-dom";

function Category({ item }) {
  const navigate = useNavigate();

  return (
    <div
      className="Category"
      style={{
        backgroundImage: `url(${item?.attributes.image.data[0].attributes.url})`,
      }}
      onClick={()=>navigate(`/category/${item.attributes.key}`)}
    >
      <div className="category-content center">
        <h3 className="heading">{item.attributes.title}</h3>
      </div>
    </div>
  );
}

export default Category;
