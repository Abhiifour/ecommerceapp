import React from 'react';
import './Hero.scss';
import {useNavigate} from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
  return (
    <div className='Hero'>
      <div className="hero-content center">
        <h2 className="heading">Exclusive Books and Publications</h2>
        <p className="subheading">
          Books For Everyone To Excell.
        </p>
        <button className='cta btn-primary' onClick={()=>navigate('/category')}>Explore</button>
      </div>
    </div>
  )
}

export default Hero