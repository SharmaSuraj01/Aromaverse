import React, { useState } from 'react';
import '../css/SignatureCollection.css';

// Import all 9 images
import img1 from '../assets/images/1.png';
import img2 from '../assets/images/2.png';
import img3 from '../assets/images/3.png';
import img4 from '../assets/images/4.png';
import img5 from '../assets/images/5.png';
import img6 from '../assets/images/6.png';
import img7 from '../assets/images/7.png';
import img8 from '../assets/images/8.png';
import img9 from '../assets/images/9.png';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

function SignatureCollection() {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => setShowAll(prev => !prev);

  return (
    <section className="signature-section py-5" id="signature">
      <div className="container">
        <h2 className="text-center mb-5">The Signature Collection</h2>
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="signature-text pe-md-4">
              <p className="lead mb-4">
                Explore our finest creations—expertly blended perfumes that define luxury.
                Each fragrance in our Signature Collection tells its own story, leaving an
                unforgettable impression.
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
