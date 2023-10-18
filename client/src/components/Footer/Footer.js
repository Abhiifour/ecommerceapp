import React from "react";
import './Footer.scss' 
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiFillTwitterSquare,
  AiOutlineMail,
} from "react-icons/ai";




function Footer() {
  return (
    <div className="Footer">
      <div className="container">
        <div className="content">
        <div className="footer-left">
          <h3 className="title">Follow us</h3>
          <ul className="follow">
            <li className="hover-link center">
              <AiOutlineFacebook />
            </li>
            <li className="hover-link center">
              <AiOutlineInstagram />
            </li>
            <li className="hover-link center">
              <AiFillTwitterSquare />
            </li>
            <li className="hover-link center">
              <AiOutlineMail />
            </li>
          </ul>
        </div>
        <div className="footer-right">
          <h3 className="title">Company</h3>
          <ul className="company">
            <li className="hover-link">Contact us</li>
            <li className="hover-link">Privacy Policy</li>
            <li className="hover-link">Return and Exchange Policy</li>
            <li className="hover-link">Shipping Policy</li>
            <li className="hover-link">Terms &  Conditions</li>
          </ul>
        </div>
        </div>
        <div className="subfooter">
          <div className="credit-card-logo">
           <img src="" alt="" />
          </div>
          <p className="center">Copyright {new Date().getFullYear() }- <strong>Posters</strong> </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
