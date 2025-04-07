import React from 'react';
import '../css/Footer.css'; // Link this CSS file

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">
          {/* Newsletter */}
          <div className="col-md-4">
            <h5 className="mb-3">SIGN UP FOR OUR NEWSLETTER</h5>
            <p>Receive our latest updates about our products & promotions.</p>
            <form className="d-flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control me-2"
              />
              <button className="btn btn-outline-light">Subscribe</button>
            </form>
          </div>

          {/* Collections */}
          <div className="col-md-2">
            <h6 className="text-uppercase mb-3">Collections</h6>
            <ul className="list-unstyled">
              <li>Perfume Sprays</li>
              <li>Mist</li>
              <li>Solid Perfume</li>
              <li>Car Perfumes</li>
              <li>Foot Spray</li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3">
            <h6 className="text-uppercase mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li>Contact us</li>
              <li>Support</li>
              <li>Shipping</li>
              <li>Returns and exchanges</li>
            </ul>
          </div>

          {/* Policies */}
          <div className="col-md-3">
            <h6 className="text-uppercase mb-3">Policies</h6>
            <ul className="list-unstyled">
              <li>Privacy policy</li>
              <li>Terms and conditions</li>
              <li>Refund policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-light" />
        <p className="text-center mb-0 small">© All rights reserved - KizuPerfumes</p>
      </div>
    </footer>
  );
};

export default Footer;
