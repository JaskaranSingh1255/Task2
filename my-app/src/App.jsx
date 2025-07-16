import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Banner from './components/Banner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductDetail from './components/ProductDetail';
function App() {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(count => count + 1);
  };

  return (
    <>
        <Routes>
  
      <Route path="/" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
