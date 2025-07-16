
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bannerImg from "../assests/discount.png"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://real-time-product-search.p.rapidapi.com/search?q=Nike%20shoes&country=uk&language=en&page=1&limit=10&sort_by=BEST_MATCH&product_condition=ANY&min_rating=ANY",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "e122586bc9msh79afd2fa3652e39p1a7320jsnb7bb00332f5e",
              "X-RapidAPI-Host": "real-time-product-search.p.rapidapi.com"
            }
          }
        );

        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setProducts(data?.data?.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 24px",
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          fontFamily: "Segoe UI",
          position: "sticky",
          top: 0,
          zIndex: 999
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#007bff" }}>
          ShopCart
        </div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <span style={{ cursor: "pointer" }}>Categories</span>
          <span style={{ cursor: "pointer" }}>Deals</span>
          <span style={{ cursor: "pointer" }}>Delivery</span>
          <span style={{ cursor: "pointer" }}>Account</span>
          <div style={{ position: "relative", fontSize: "1.5rem", cursor: "pointer" }}>
            🛒
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -8,
                  right: -10,
                  background: "red",
                  color: "white",
                  fontSize: "0.75rem",
                  padding: "2px 6px",
                  borderRadius: "50%"
                }}
              >
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Banner Image */}
      <div style={{ width: "100%", marginBottom: "20px" }}>
        <img
          src={bannerImg}
          alt="Discount Banner"
          style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
        />
      </div>

      {/* Product Section */}
      <div style={{ padding: "0 24px" }}>
        <h2 style={{ fontFamily: "Segoe UI", marginBottom: "16px" }}>Our Top Picks</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px"
          }}
        >
          {products.map(product => (
            <div
              key={product.product_id}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: 12,
                padding: 16,
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <Link
                to={`/product/${product.product_id}`}
                state={{ product }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={product.product_photos?.[0]}
                  alt={product.product_title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: 8,
                    marginBottom: 12
                  }}
                />
                <h4 style={{ marginBottom: 8 }}>{product.product_title}</h4>
              </Link>

              <p style={{ fontSize: "0.9em", color: "#555", marginBottom: 8 }}>
                {product.product_description.slice(0, 100)}...
              </p>
              <p style={{ fontSize: "0.9em", color: "#333" }}>
                <strong>Rating:</strong> {product.product_rating} ⭐
              </p>
              <p style={{ fontSize: "0.9em", color: "#333" }}>
                <strong>Reviews:</strong> {product.product_num_reviews}
              </p>

              <button
                onClick={handleAddToCart}
                style={{
                  marginTop: 12,
                  padding: "10px 14px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
