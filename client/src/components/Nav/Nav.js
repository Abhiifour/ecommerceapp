import React, { useState } from "react";
import "./Nav.scss";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const cartData = useSelector((state)=> state.cartSlice.cart);
  
  const categoriesData = useSelector((state) => state.categorySlice.categories);
  let totalItem = 0;
  cartData.forEach(item=> totalItem += item.quantity)


  return (
    <>
      <div className="Navbar">
        <div className="container nav-container">
          <div className="nav-left">
            <ul className="link-group">
              {categoriesData.map((item) => 
                <li className="hover-link" key={item?.id}>
                  <Link
                    className="link"
                    to={`/category/${item?.attributes.key}`}
                  >
                 {item?.attributes?.title}
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="nav-center">
            <Link to="/">
              <h1 className="banner">Posters</h1>
            </Link>
          </div>
          <div className="nav-right">
            <div className="nav-cart" onClick={() => setIsOpen(!isOpen)}>
              <BsCart2 className="icon" />
            {totalItem > 0 &&   <span className="cart-count center">{totalItem}</span>}
            </div>
          </div>
        </div>
      </div>
      {isOpen && <Cart onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default Nav;
