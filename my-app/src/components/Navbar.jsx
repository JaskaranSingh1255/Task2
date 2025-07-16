import React from 'react';
import './Navbar.css';

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">ShopCart</div>
        <ul className="nav-links">
          <li>Categories</li>
          <li>Deals</li>
          <li>What's New</li>
          <li>Delivery</li>
        </ul>
      </div>
      <div className="navbar-center">
        <input type="text" className="search-input" placeholder="Search products..." />
      </div>
      <div className="navbar-right">
        <div className="nav-item">Account</div>
        <div className="cart"> Cart 🛒 <span className="cart-count">{cartCount}</span></div>
      </div>
    </nav>
  );
}

export default Navbar;
