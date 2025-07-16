import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://real-time-product-search.p.rapidapi.com/search',
          {
            params: {
              q: 'Nike shoes',
              country: 'uk',
              language: 'en',
              page: '1',
              limit: '10',
              sort_by: 'BEST_MATCH',
              product_condition: 'ANY',
              min_rating: 'ANY'
            },
            headers: {
              'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com',
              'x-rapidapi-key': 'e122586bc9msh79afd2fa3652e39p1a7320jsnb7bb00332f5e'
            }
          }
        );
        setProducts(response.data.data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Nike Shoes Collection</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.product_id} 
              product={product}
              onClick={() => navigate(`/product/${product.product_id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;