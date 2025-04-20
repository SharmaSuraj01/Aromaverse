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

      // Auto-close popup after 3 seconds (optional)
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  // Most Searched Keywords
  const searchedKeywords = [
    "Perfume", "Best perfume for men", "attar", "Ittar", "attar perfume", "oud attar", 
    "best attar for women", "best attar for men", "Perfume for men", "Vitamin C Face Wash", 
    "Perfume for women", "Best perfume for women", "Perfume set for women", "Gift for Men", 
    "Face wash for oily skin", "Body scrub", "Dark circle", "Perfume for girls", 
    "Dark circles removal cream", "Acne face wash", "under eye cream", "Gift sets for women", 
    "Body wash for women", "Pocket perfume for men", "De tan face pack", "Pimple removal cream", 
    "Lip scrub", "Tan removal face pack", "Face wash for acne", "Exfoliate scrub", "Gift set for men", 
    "Coffee Body Scrub", "Best long lasting perfume for men", "Perfumes for men under 500", 
    "Perfumes for women under 500", "Perfume gift sets", "Oud perfume", "Ceo perfume", 
    "Under eye cream for dark circles", "Acne cream", "Vitamin c cream for face", "Body lotion for women", 
    "Long lasting perfume for women", "Perfume gift pack for her", "Perfume gift pack for him", 
    "Charcoal face wash", "Body wash for men", "Best shower gel for women", "Shower Gel for men and Women", 
    "Body lotion for dry skin", "Body Lotion for men", "Body Lotion for women", "Shower Gel and Perfume Combo", 
    "Shower Travel Kit", "Travel Mini Kit", "Birthday Gift for Women/Girls", "Wedding Gifts for Couples", 
    "Gifts for Men Under 500", "Gifts for Women Under 500", "Diwali Gift Ideas", "Gifts for Men Under 500", 
    "Gifts for Women Under 500", "Corporate Gifts"
  ];

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

        {/* Most Searched Keywords */}
        <div className="row mt-4">
          <div className="col-12">
            <h6 className="text-uppercase mb-4">Most Searched Keywords</h6>
            <ul className="list-unstyled d-flex flex-wrap gap-3">
              {searchedKeywords.map((keyword, index) => (
                <li key={index}>
                  <span className="badge bg-light text-dark">{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-5 border-light" />
        <p className="text-center mb-0 small">© All rights reserved - KizuPerfumes</p>
      </div>

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
