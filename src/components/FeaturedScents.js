import React from 'react';
import scent1 from '../assets/images/scent1.jpg'; // Example image
import scent2 from '../assets/images/scent2.jpg';
import scent3 from '../assets/images/scent3.jpg';

function FeaturedScents() {
  const scents = [
    { id: 1, name: 'KZ Black', price: '₹999', img: scent1 },
    { id: 2, name: 'KZ Seduced', price: '₹1299', img: scent2 },
    { id: 3, name: 'KZ Sports', price: '₹1499', img: scent3 },
  ];

  return (
    <section className="featured-scents" id="featured">
      <h2>Featured Scents</h2>
      <div className="featured-scents__grid">
        {scents.map((scent) => (
          <div className="featured-scents__item" key={scent.id}>
            <img src={scent.img} alt={scent.name} />
            <h3>{scent.name}</h3>
            <p>{scent.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedScents;
