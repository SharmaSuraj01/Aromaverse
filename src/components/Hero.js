import React from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';  

import heroImage2 from '../assets/images/scent2.jpg';
import heroImage3 from '../assets/images/scent3.jpg';
import '../css/Hero.css';

function Hero() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return <div className="arrow prev" onClick={onClick}><FaArrowLeft /></div>;
  }

  function SampleNextArrow(props) {
    const { onClick } = props;
    return <div className="arrow next" onClick={onClick}><FaArrowRight /></div>;
  }

  const slides = [
    // { type: 'video', src: heroVideo },
    { type: 'image', src: heroImage2 },
    { type: 'image', src: heroImage3 }
  ];

  return (
    <section className="hero-slider">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="hero-slide">
            {slide.type === 'video' ? (
              <video
                className="slider-img"
                src={slide.src}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img src={slide.src} alt={`Slide ${idx + 1}`} className="slider-img" />
            )}
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Hero;
