import React, { useEffect, useState } from "react";
import productImg from "../../assests/steve.jpg";
import "./ProductDetail.scss";
import { axiosClient } from "../../utils/axiosClient";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

function ProductDetail() {
  const params = useParams();
  const [products, setProducts] = useState(null);
  const dispatch = useDispatch();
  const cartData = useSelector((state)=> state.cartSlice.cart);
  const quantity = cartData.find(item => item.key === params.productId)?.quantity || 0;
  async function fetchData() {
    const productResponse = await axiosClient.get(
      `/products?filters[key][$eq=${params.productId}&populate=image`
    );
    setProducts(productResponse?.data?.data[0])
  }

  useEffect(()=>{
    setProducts(null);
    fetchData();
  },[params])

  


  return (
    <div className="ProductDetail">
      <div className="container">
        <div className="product-layout">
          <div className="product-img">
            <img src={products?.attributes?.image?.data[0].attributes?.url} alt={products?.attributes?.title}/>
          </div>
          <div className="product-info">
            <h1 className="heading">{products?.attributes?.title}</h1>
            <h3 className="price">₹ {products?.attributes?.price}</h3>
            <p className="description">
             {products?.attributes?.description}
            </p>
            <div className="cart-options">
              <div className="quantity-selector">
                <span className="btn decrement" onClick={()=> dispatch(removeFromCart(products))}>-</span>
                <span className="quantity ">{quantity}</span>
                <span className="btn increment" onClick={()=> dispatch(addToCart(products))}>+</span>
              </div>
              <button className="btn-primary add-to-cart">Add to Cart</button>
            </div>
            <div className="return-policy">
              <ul>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo
                  culpa reiciendis ratione, quibusdam commodi similique
                  doloribus inventore id rem vero.
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Suscipit debitis veniam deserunt dolorem quasi saepe illum
                  tempore sunt dolor vitae a, qui voluptas placeat! Ab
                  consectetur delectus et similique facere?
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
