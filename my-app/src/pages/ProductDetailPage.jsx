import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://real-time-product-search.p.rapidapi.com/product-details',
          {
            params: {
              product_id: productId,
              country: 'us',
              language: 'en'
            },
            headers: {
              'x-rapidapi-host': 'real-time-product-search.p.rapidapi.com',
              'x-rapidapi-key': 'e122586bc9msh79afd2fa3652e39p1a7320jsnb7bb00332f5e'
            }
          }
        );
        setProductDetails(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8 text-red-500">Error: {error}</div>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">Product not found</div>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/')}
          className="mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <div className="h-96 bg-gray-200 mb-4 rounded-lg overflow-hidden">
                {productDetails.product_photos && productDetails.product_photos.length > 0 && (
                  <img 
                    src={productDetails.product_photos[0]} 
                    alt={productDetails.product_title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {productDetails.product_photos?.slice(0, 4).map((photo, index) => (
                  <div key={index} className="h-20 bg-gray-200 rounded overflow-hidden">
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl font-bold mb-2">{productDetails.product_title}</h1>
              <div className="flex items-center mb-4">
                {productDetails.product_rating && (
                  <>
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-gray-600">
                      {productDetails.product_rating} ({productDetails.product_num_reviews || 0} reviews)
                    </span>
                  </>
                )}
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {productDetails.offer?.price || 'Price not available'}
                </span>
                {productDetails.offer?.original_price && (
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    {productDetails.offer.original_price}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-6">{productDetails.product_description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                <ul className="space-y-1">
                  {productDetails.product_attributes && Object.entries(productDetails.product_attributes).map(([key, value]) => (
                    <li key={key} className="flex">
                      <span className="text-gray-600 font-medium w-32">{key}:</span>
                      <span className="text-gray-800">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;