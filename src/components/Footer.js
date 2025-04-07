import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-5">
      <div className="container">
        <div className="row gy-5 gx-5">

          {/* Newsletter */}
          <div className="col-md-5">
            <h5 className="mb-4">SIGN UP FOR OUR NEWSLETTER</h5>
            <p>Receive our latest updates about our products & promotions.</p>
            <form className="d-flex flex-column flex-sm-row align-items-stretch gap-3 mt-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
              />
              <button className="btn btn-outline-light">Subscribe</button>
            </form>
          </div>

          {/* Customer Service */}
          <div className="col-md-3">
            <h6 className="text-uppercase mb-4">Customer Service</h6>
            <ul className="list-unstyled">
              <li>Contact us</li>
              <li>Support</li>
              <li>Shipping</li>
              <li>Returns and exchanges</li>
            </ul>
          </div>

          {/* Policies */}
          <div className="col-md-3">
            <h6 className="text-uppercase mb-4">Policies</h6>
            <ul className="list-unstyled">
              <li>Privacy policy</li>
              <li>Terms and conditions</li>
              <li>Refund policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>

        </div>

        <hr className="my-5 border-light" />
        <p className="text-center mb-0 small">© All rights reserved - KizuPerfumes</p>
      </div>
    </footer>
  );
};

export default Footer;
