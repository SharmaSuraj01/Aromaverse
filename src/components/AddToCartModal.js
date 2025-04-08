import React, { useEffect, useRef } from 'react';
import '../css/AddToCartModal.css';

const AddToCartModal = ({ cartItems, onClose, onUpdateQty, onRemove }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      (typeof item.price === 'string'
        ? parseInt(item.price.replace('₹', ''))
        : item.price) *
        item.qty,
    0
  );

  return (
    <div className="modal-overlay">
      <div className="cart-modal" ref={modalRef}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h3 className="modal-title">🛒 Your Cart</h3>

        {cartItems.length === 0 ? (
          <p className="empty-cart-text">Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={item.id} className="modal-product-info">
              <img src={item.img} alt={item.name} />
              <div className="modal-product-details">
                <h5>{item.name}</h5>
                <p className="modal-price">₹{item.price}</p>
                <div className="qty-control">
                  <button onClick={() => onUpdateQty(index, item.qty - 1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onUpdateQty(index, item.qty + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => onRemove(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="modal-footer">
            <p className="modal-total">Total: ₹{total.toLocaleString()}</p>
            <button className="checkout-btn">Checkout Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartModal;
