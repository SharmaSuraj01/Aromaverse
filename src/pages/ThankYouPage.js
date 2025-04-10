// ThankYouPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center bg-light p-5 rounded shadow">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5290/5290058.png"
          alt="Order Confirmed"
          style={{ width: '100px' }}
          className="mb-4"
        />
        <h2 className="mb-3">Thank You for Your Order!</h2>
        <p className="mb-4 text-muted">
          Your order has been placed successfully. We’ll send you a confirmation email shortly.
        </p>
        <button className="btn btn-dark px-4" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
