import React from 'react';
import '../css/Hero.css';
import perfumeImage from '../assets/images/gitaami.png'; // replace with actual path

const Hero = () => {
  return (
    <section className="gitaami-hero">
      <div className="gitaami-left">
        <h1 className="gitaami-name">Gitaami</h1>
        <p className="gitaami-subheading">68% Natural Absolutes and Essential Oils</p>
        
        <h2 className="sacred-rebellion">Scent of Sacred Rebellion</h2>
        <p className="scent-profile">Scent Profile</p>
        <hr className="scent-divider" />
        <p className="scent-character">Scent Character</p>
      </div>

      <div className="gitaami-image">
        <img src={perfumeImage} alt="Perfume Bottle" />
      </div>
    </section>
  );
};

export default Hero;
