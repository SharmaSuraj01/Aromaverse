import React, { useState } from 'react';
import '../css/SignatureCollection.css';

import img1 from '../assets/photo/11.jpg';
import img2 from '../assets/photo/12.jpg';
import img3 from '../assets/photo/13.jpg';
import img4 from '../assets/photo/141.jpg';
import img5 from '../assets/photo/151.jpg';
import img6 from '../assets/photo/161.jpg';
import img7 from '../assets/photo/171.jpg';


const images = [img1, img2, img3, img4, img5, img6, img7];

function SignatureCollection() {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => setShowAll(prev => !prev);

  return (
    <section className="signature-section py-5" id="signature">
      <div className="container">
        <h2 className="text-center mb-5">Discover our Signature Collection</h2>
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="signature-text pe-md-4">
              <p className="lead mb-4">
              an exclusive range of masterfully crafted perfumes that embody elegance and sophistication. Each scent is a unique expression, designed to leave a lasting impression.
              </p>
              <button className="btn btn-dark px-4 py-2 rounded-pill" onClick={handleToggle}>
                {showAll ? 'Hide Collection' : 'View Collection'}
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-md-6 d-flex flex-wrap justify-content-center gap-3">
            {(showAll ? images : images.slice(0, 2)).map((img, index) => (
              <div key={index} className="signature-img-wrapper">
                <img
                  src={img}
                  alt={`Signature Perfume ${index + 1}`}
                  className="img-fluid rounded shadow-sm"
                  style={{ width: '140px', height: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignatureCollection;
