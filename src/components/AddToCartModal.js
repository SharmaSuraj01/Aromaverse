import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddToCartModal.css';

const AddToCartModal = ({ cartItems, onClose, onUpdateQty, onRemove }) => {
  const modalRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const total = cartItems.reduce((sum, item) => {
    const numericPrice =
      typeof item.price === 'string'
        ? parseInt(item.price.replace(/[₹,]/g, ''))
        : item.price;
    return sum + numericPrice * item.qty;
  }, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout', { state: { cartItems, total } });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="cart-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h3 className="modal-title">🛒 Your Cart</h3>

        {cartItems.length === 0 ? (
          <p className="empty-cart-text">Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={item.id} className="modal-product-info">
              <img src={item.images?.[0] || 'https://via.placeholder.com/100'} alt={item.name} />
              <div className="modal-product-details">
                <h5>{item.name}</h5>
                <p className="modal-price">₹{item.price}</p>
                <div className="qty-control">
                  <button
                    onClick={() => onUpdateQty(index, item.qty - 1)}
                    disabled={item.qty === 1}
                  >
                    -
                  </button>
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
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCartModal;
