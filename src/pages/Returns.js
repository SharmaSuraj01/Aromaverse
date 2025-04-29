import React from 'react';
import '../css/Returns.css'; // Optional: for styling
import { Link } from 'react-router-dom';
import noReturnImg from '../assets/photo/11.jpg'; // Optional image

const Returns = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center py-5" style={{ minHeight: '80vh' }}>
      <img
        src={noReturnImg}
        alt="No Returns"
        className="mb-4"
        style={{ maxWidth: '250px' }}
      />

      <h2 className="mb-3 fw-bold">We Don’t Accept Returns</h2>
      <p className="text-muted" style={{ maxWidth: '500px' }}>
        Due to the personal and delicate nature of our perfumes, we are unable to accept returns or exchanges once the product is delivered.
        We appreciate your understanding and encourage you to reach out if you face any issue with your order.
      </p>

      <Link to="/contact" className="btn btn-dark mt-4 px-4 py-2">
        Contact Support
      </Link>
    </div>
  );
};

export default Returns;
