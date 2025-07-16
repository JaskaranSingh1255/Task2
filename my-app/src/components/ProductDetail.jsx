
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  if (!product) {
    return <p style={{ padding: 20 }}>No product data. <button onClick={() => navigate(-1)}>Go Back</button></p>;
  }

  return (
    <div className="detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-content">
        <div className="image-gallery">
          {product.product_photos.map((photo, i) => (
            <img key={i} src={photo} alt={`Product ${i}`} className="detail-img" />
          ))}
        </div>
        <div className="product-details">
          <h2>{product.product_title}</h2>
          <p><strong>ID:</strong> {product.product_id}</p>
          <p><strong>Description:</strong> {product.product_description}</p>
          <p><strong>Rating:</strong> {product.product_rating} ⭐ ({product.product_num_reviews} reviews)</p>
          <p><strong>Price:</strong> {product.offer?.price}</p>
          {product.offer?.on_sale && (
            <p><strong>Discount:</strong> {product.offer?.percent_off}</p>
          )}
          <a href={product.product_page_url} target="_blank" rel="noopener noreferrer">
            <button className="buy-btn">Buy on Official Page</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
