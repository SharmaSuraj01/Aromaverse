import React, { useEffect, useState } from 'react';

const BannersDisplay = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const storedBanners = JSON.parse(localStorage.getItem('banners')) || [];
    setBanners(storedBanners);
  }, []);

  return (
    <div className="banners-display">
      <h2>Uploaded Banners</h2>
      {banners.length === 0 ? (
        <p>No banners uploaded yet.</p>
      ) : (
        <div className="banner-grid">
          {banners.map((banner, idx) => (
            <div key={idx} className="banner-item">
              <img
                src={typeof banner === 'string' ? banner : URL.createObjectURL(banner)}
                alt={`banner-${idx}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannersDisplay;

