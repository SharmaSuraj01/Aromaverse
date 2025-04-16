import React, { useState } from 'react';
import '../styles/SeoSettings.css';

const SeoSettings = () => {
  const [seo, setSeo] = useState({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  });

  const handleChange = (e) => {
    setSeo({ ...seo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('✅ SEO settings saved (to be handled by backend later)');
    console.log(seo);
  };

  return (
    <div className="seo-container">
      <h2 className="seo-heading">SEO Settings</h2>
      <form onSubmit={handleSubmit} className="seo-form">
        <div className="form-group">
          <label>Meta Title</label>
          <input
            type="text"
            name="metaTitle"
            value={seo.metaTitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Meta Description</label>
          <textarea
            name="metaDescription"
            value={seo.metaDescription}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="form-group">
          <label>Meta Keywords</label>
          <input
            type="text"
            name="metaKeywords"
            value={seo.metaKeywords}
            onChange={handleChange}
            placeholder="perfume, luxury, scent..."
          />
        </div>
        <div className="form-group">
          <label>Canonical URL</label>
          <input
            type="text"
            name="canonicalUrl"
            value={seo.canonicalUrl}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>OG Title</label>
          <input
            type="text"
            name="ogTitle"
            value={seo.ogTitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>OG Description</label>
          <textarea
            name="ogDescription"
            value={seo.ogDescription}
            onChange={handleChange}
            rows={2}
          />
        </div>
        <div className="form-group">
          <label>OG Image URL</label>
          <input
            type="text"
            name="ogImage"
            value={seo.ogImage}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">Save SEO Settings</button>
      </form>
    </div>
  );
};

export default SeoSettings;
