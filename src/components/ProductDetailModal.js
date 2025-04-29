import React from 'react';
import '../css/ProductDetailModal.css';

function ProductDetailModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('product-modal-backdrop')) {
      onClose();
    }
  };

  return (
    <div className="product-modal-backdrop" onClick={handleBackdropClick}>
      <div className="product-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="product-modal-body">
          <div className="img-wrap">
            <img
              src={product.images?.[0] || 'https://via.placeholder.com/300'}
              alt={product.name}
            />
          </div>
          <div className="info-wrap">
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>
            <p className="desc">
              Experience sheer luxury with "{product.name}". Keeps you fresh and confident all day. Ideal for travel, gifting, or daily wear.
            </p>
            <button
              className="btn btn-dark mt-3"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
