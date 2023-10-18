import React from 'react';
import steveImg  from '../../assests/steve.jpg';
import './Product.scss';
import {useNavigate} from 'react-router';

function Product({product}) {
  const navigate = useNavigate();
  return (
    <div className='Product'>
      <div className="product-container" onClick={()=> navigate(`/products/${product.attributes.key}`)}>
        <div className="product-img">
          <div className="img-container">
            <img src={product?.attributes?.image.data[0].attributes?.url} alt={product?.attributes?.title} id='img'/>
          </div>
        </div>
        <div className="product-info">
          <p className="title">{product?.attributes?.title}</p>
          <p className="price">₹ {product?.attributes?.price}</p>
        </div>
      </div>
    </div>
  )
}

export default Product;