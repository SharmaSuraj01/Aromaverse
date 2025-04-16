import React from 'react';
import '../styles/Feature.css';

const FeaturedProducts = () => {
  const products = [
    { name: 'Product 1', price: '1199', image: '/14.JPG' },
    { name: 'Product 2', price: '1299', image: '/16.JPG' },
    { name: 'Product 3', price: '1399', image: '/17.JPG' }
  ];

  return (
    <div className="featured-products-container">
      <h2 className="section-heading">Featured Products</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
