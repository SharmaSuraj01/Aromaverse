import React from 'react';
import '../styles/BestSellers.css';

const Bestsellers = () => {
  const products = [
    { name: 'Product 1', price: '999', image: '/14.JPG' },
    { name: 'Product 1', price: '1499', image: '/16.JPG' },
    { name: 'Product 1', price: '1899', image: '/17.JPG' }
  ];

  return (
    <div className="bestsellers-container">
      <h2 className="section-heading">Bestsellers</h2>
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

export default Bestsellers;
