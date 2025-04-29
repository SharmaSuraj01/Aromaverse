import React from 'react';
import '../css/Features.css';
import parabenFree from '../assets/photo/paraben-free.png';
import sulphateFree from '../assets/photo/sulphate-free.png';
import crueltyFree from '../assets/photo/cruelty-free.png';
import non from '../assets/photo/non-carc.png';
import siliconFree from '../assets/photo/silicon-free.png';

function Features() {
  const features = [
    { img: parabenFree, label: 'Paraben Free' },
    { img: sulphateFree, label: 'Sulphate Free' },
    { img: crueltyFree, label: 'Cruelty Free' },
    { img: non, label: '100% Vegan' },
    { img: siliconFree, label: 'Silicon Free' },
  ];

  return (
    <section className="features-section">
      <div className="features-container">
        {features.map((item, idx) => (
          <div className="feature-card" key={idx}>
            <img src={item.img} alt={item.label} />
            <p>{item.label}</p>
          </div>
        ))}
      </div>
      <div className="intro-container">
  <h2 className="intro-title">Aromaverse – A Symphony of Fragrance</h2>
  <p className="intro-text">
    Step into the enchanting world of <strong>Aromaverse</strong>, where every scent tells a story. Celebrated as one of India’s finest perfume brands, Aromaverse offers a curated collection crafted to captivate both men and women alike.
    <br /><br />
    Discover our exquisite range of perfume sprays, solid perfumes, body mists, scented candles, roll-ons, reed diffusers, perfumed crèmes, and beard balms. Buy perfumes online and let each fragrance express your individuality, elevate your style, and transform ordinary moments into unforgettable experiences.
  </p>
</div>
    </section>
    
  );
}

export default Features;
