import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./Cart.scss";
import CartItem from "../cartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import {loadStripe} from '@stripe/stripe-js';
import { BsCartCheck } from 'react-icons/bs'

const stripePromise = loadStripe('pk_test_51MzNWrSE66S00axO3HDnRjopV4IY1EIwfSbQnZ9J6mmetEZu2HDCUwZxEVzJaXC9wGwpawyC1YFejsKhHGyXylUI00fcw81RhK');


function Cart({ onClose }) {
  const cartData = useSelector((state) => state.cartSlice.cart);
  let totalAmount = 0;
  cartData.forEach((item) => (totalAmount += item.quantity * item.price));

  const empty = cartData.length === 0;

  async function handleCheckout(){
    const response = await axiosClient.post('/orders',{
      product:cartData
    })
   
   const stripe = await stripePromise;
   await stripe.redirectToCheckout({
     sessionId:response.data.stripeId,
   })
  }
  return (
    <div className="Cart">
      <div className="overlay" onClick={onClose}></div>
      <div className="cart-content">
        <div className="header">
          <h3>Shopping Cart</h3>
          <div className="close-btn" onClick={onClose}>
            <AiOutlineClose /> Close
          </div>
        </div>
        <div className="cart-item">
          {cartData.map((cart) => (
            <CartItem key={cart.key} cart={cart} />
          ))}
        </div>
        {empty && (
          <div className="empty-cart-info">
            <div className="icon"><BsCartCheck /></div>
            <h3 className="empty-message">Cart is Empty</h3>
          </div>
        )}
        {!empty && (
          <div className="checkout-info">
            <div className="total-amount">
              <h3 className="total-message">Total</h3>
              <h3 className="total-value">{totalAmount}</h3>
            </div>
            <div className="checkout btn-primary" onClick={handleCheckout}>Checkout Now</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
