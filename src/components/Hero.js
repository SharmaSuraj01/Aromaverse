import React from 'react';
import heroImage from '../assets/images/hero-background.jpg';
function Hero() {
  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero__content">
        <h1>Discover Your Signature Scent</h1>
        <p>Elevate your senses with Kizu Perfumes</p>
        <button>Shop Now</button>
      </div>
    </section>
  );
}

export default Hero;
