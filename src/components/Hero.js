import React from 'react';
import Slider from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';  
import heroImage1 from '../assets/images/scent4.jpg';
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

  return (
    <section className="hero-slider">
      <Slider {...settings}>
        {[heroImage1, heroImage2, heroImage3].map((img, idx) => (
          <div key={idx} className="hero-slide">
            <img src={img} alt={`Slide ${idx + 1}`} className="slider-img" />
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default Hero;
