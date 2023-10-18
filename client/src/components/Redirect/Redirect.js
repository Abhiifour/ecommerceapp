import React from "react";
import "./Redirect.scss";
import { BsCartCheck } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import {TbShoppingCartX} from 'react-icons/tb'
import { useDispatch } from "react-redux";
import { removeCartItem } from "../../redux/slices/cartSlice";

function Redirect() {
  const params = useParams();
  const naviagate = useNavigate();
  const status = params.status;
  const dispatch =useDispatch();
  const result = {
    success: {
      cta: "Shop more",
      text: "Your order has been Placed successfully",
      icon: <BsCartCheck />,
    },
    failed: {
      icon:<TbShoppingCartX/>,
      text: "Payment failed",
      cta:'Try again'
    },
  };

  if(status === 'success'){
         dispatch(removeCartItem());
  }

  return (
    <div className="Redirect">
      <div className="icon">{result[status].icon}</div>
      <div className="icon-text">{result[status].text}</div>
      <button className="btn-primary" onClick={()=> naviagate('/')}>{result[status].cta}</button>
    </div>
  );
}

export default Redirect;
