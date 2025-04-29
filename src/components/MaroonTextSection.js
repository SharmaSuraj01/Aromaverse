import React from 'react';
import '../css/MaroonTextSection.css'; // Make sure this CSS file is correctly linked

function MaroonTextSection() {
  return (
    <section className="maroon-text-section">
      <div className="container text-center py-5">
        <h1 className="stylish-header">Aromaverse – Universe of All Fragrance</h1> {/* Static text for header */}
        <p className="lead fw-medium">
          At <span className="fw-bold text-light">Aromaverse</span>, we believe fragrance is more than a scent—it's a reflection of who you are. 
          Our thoughtfully curated collections are crafted to capture your essence, celebrate your style, and enhance every cherished moment.

        </p>
        <p className="lead fw-medium">
        Whether you're indulging yourself or finding the perfect gift, Aromaverse offers scents that elevate every experience into something truly memorable.
        </p>
      </div>
    </section>
  );
}

export default MaroonTextSection;
