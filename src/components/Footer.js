import React, { useState } from 'react';
import '../css/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (email.trim()) {
      setShowPopup(true);
      setEmail('');

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };


  return (
    <footer className="footer bg-dark text-white pt-5 pb-5">
      <div className="container">
        <div className="row gy-5 gx-5">

          {/* Newsletter */}
          <div className="col-md-5">
            <h5 className="mb-4">SIGN UP FOR OUR NEWSLETTER</h5>
            <p>Receive our latest updates about our products & promotions.</p>
            <form
              className="d-flex flex-column flex-sm-row align-items-stretch gap-3 mt-3"
              onSubmit={handleSubscribe}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-outline-light">Subscribe</button>
            </form>
          </div>

          {/* Customer Service */}
          <div className="col-md-3">
            <h6 className="text-uppercase mb-4">Customer Service</h6>
            <ul className="list-unstyled">
              <li><Link to="/contact" className="text-white text-decoration-none">Contact us</Link></li>
              <li><Link to="/support" className="text-white text-decoration-none">Support</Link></li>
              {/* <li><Link to="/shipping" className="text-white text-decoration-none">Shipping</Link></li> */}
              <li><Link to="/returns" className="text-white text-decoration-none">Returns and exchanges</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="col-md-3">
            <h6 className="text-uppercase mb-4">Policies</h6>
            <ul className="list-unstyled">
              <li><Link to="/PrivacyPolicy" className="text-white text-decoration-none">Privacy Policy</Link></li>
              <li><Link to="/TermsAndConditions" className="text-white text-decoration-none">Terms and conditions</Link></li>
              <li><Link to="/RefundPolicy" className="text-white text-decoration-none">Refund Policy</Link></li>
              <li><Link to="/TermsOfService" className="text-white text-decoration-none">Terms of service</Link></li>
            </ul>
          </div>
        </div>

        </div>

        <hr className="my-5 border-light" />
        <p className="text-center mb-0 small">© All rights reserved - Aromaverse Perfumes</p>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box bg-white text-dark p-4 rounded shadow">
            <h5 className="mb-2">Subscribed Successfully ✅</h5>
            <p className="mb-0">Thank you for subscribing!</p>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
