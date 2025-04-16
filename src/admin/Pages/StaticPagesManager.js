import React, { useState } from 'react';
import '../styles/StaticPagesManager.css';

const StaticPagesManager = () => {
  const [pages, setPages] = useState({
    about: '',
    contact: '',
    faq: ''
  });

  const handleChange = (e) => {
    setPages({ ...pages, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('staticPagesContent', JSON.stringify(pages));
    alert('✅ Static pages content saved (backend integration pending)');
  };

  return (
    <div className="static-pages-container">
      <h2 className="static-pages-heading">Static Pages Manager</h2>
      <form onSubmit={handleSubmit} className="static-pages-form">
        <div className="static-form-group">
          <label>About Us</label>
          <textarea
            name="about"
            value={pages.about}
            onChange={handleChange}
            rows={4}
            placeholder="Write about your brand..."
          />
        </div>
        <div className="static-form-group">
          <label>Contact</label>
          <textarea
            name="contact"
            value={pages.contact}
            onChange={handleChange}
            rows={4}
            placeholder="Contact information..."
          />
        </div>
        <div className="static-form-group">
          <label>FAQ</label>
          <textarea
            name="faq"
            value={pages.faq}
            onChange={handleChange}
            rows={4}
            placeholder="Frequently asked questions..."
          />
        </div>
        <button type="submit" className="static-save-btn">
          Save Static Pages
        </button>
      </form>
    </div>
  );
};

export default StaticPagesManager;
