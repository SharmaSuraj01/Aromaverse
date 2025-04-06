import React from 'react';

function SignatureCollection() {
  return (
    <section className="signature-collection" id="signature">
      <h2>The Signature Collection</h2>
      <div className="signature-collection__content">
        <div className="signature-collection__text">
          <p>
            Explore our finest creations—expertly blended perfumes that define luxury. 
            Each fragrance in our Signature Collection tells its own story, leaving an 
            unforgettable impression.
          </p>
          <button>View Collection</button>
        </div>
        <div className="signature-collection__images">
          {/* Example images */}
          <img src="https://via.placeholder.com/200" alt="Signature Perfume 1" />
          <img src="https://via.placeholder.com/200" alt="Signature Perfume 2" />
        </div>
      </div>
    </section>
  );
}

export default SignatureCollection;
