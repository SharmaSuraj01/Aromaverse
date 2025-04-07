import React from 'react';
import heroImage from '../assets/images/hero-background.jpg';
import '../css/Hero.css'; // Add this line

function Hero() {
  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* <div className="hero-content">
        <h1>Discover Your Signature Scent</h1>
        <p>Elevate your senses with Kizu Perfumes</p>
        <button>Shop Now</button> */}
    </section>
  );
}

export default Hero;
