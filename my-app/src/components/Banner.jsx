import React from 'react';
import './Banner.css';
import bannerImage from '../assests/Banner.png';

function Banner() {
  return (
    <div className="banner">
      <img src={bannerImage} alt="Discount Banner" />
    </div>
  );
}

export default Banner;
