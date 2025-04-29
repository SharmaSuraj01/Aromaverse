import React from 'react';
import '../css/Hero.css';
import perfumeImage from '../assets/photo/hero.jpg'; 

const Hero = () => {
  return (
    <section className="Aromaverse-hero">
      <div className="Aromaverse-left">
        <h1 className="Aromaverse-name">Aromaverse</h1>
        <p className="Aromaverse-subheading">perfect Fragrance</p>
        
        <h2 className="sacred-rebellion">Scent of Sacred Rebellion</h2>
        <p className="scent-profile">For Universe</p>
        <p className="scent-profile">EAU DE PARFUM</p>
        <p className="scent-character">Scent Character</p>
      </div>

      <div className="Aromaverse-image">
        <img src={perfumeImage} alt="Perfume Bottle" />
      </div>
    </section>
  );
};

export default Hero;
