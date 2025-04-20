import React from 'react';
import '../css/MaroonTextSection.css'; // Make sure this CSS file is correctly linked

function MaroonTextSection() {
  return (
    <section className="maroon-text-section">
      <div className="container text-center py-5">
        <h1 className="stylish-header">Gitaami – Fragrance That Defines You</h1> {/* Static text for header */}
        <p className="lead fw-medium">
          At <span className="fw-bold text-dark">Gitaami</span>, we understand that fragrance is more than just a scent;
          it’s a way to express yourself. Our curated collections are designed to reflect your identity, your style, and your moments.
        </p>
        <p className="lead fw-medium">
          Whether you're selecting a fragrance for yourself or a loved one, you'll find the perfect scent that elevates every experience.
        </p>
      </div>
    </section>
  );
}

export default MaroonTextSection;
