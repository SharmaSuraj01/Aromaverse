import React from 'react';
import '../css/Features.css';
import parabenFree from '../assets/images/paraben-free.png';
import sulphateFree from '../assets/images/sulphate-free.png';
import crueltyFree from '../assets/images/cruelty-free.png';
import non from '../assets/images/non-carc.png';
import siliconFree from '../assets/images/silicon-free.png';

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
    <h2 className="intro-title">Gitaami - A Symphony of Fragrance</h2>
    <p className="intro-text">
      Indulge in the enchanting world of perfumes with <strong>Gitaami</strong>, the best perfume brand in India. Whether you seek a captivating perfume for men or a mesmerizing fragrance for women, our curated collection has something for everyone.
      <br /><br />
      Experience the allure of our perfume sprays, solid perfumes, body mists, scented candles, roll-ons, reed diffusers, perfumed crème, and beard balms. Buy perfume online and immerse yourself in a sensory journey that reflects your unique style and personality. Elevate every moment with the magic of <strong>Gitaami</strong>!
    </p>
  </div>
    </section>
    
  );
}

export default Features;
