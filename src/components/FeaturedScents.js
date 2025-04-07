import React, { useRef } from 'react';
import scent1 from '../assets/images/scent1.jpg';
import scent2 from '../assets/images/scent2.jpg';
import scent3 from '../assets/images/scent3.jpg';
import scent4 from '../assets/images/1.png';
import scent5 from '../assets/images/9.png';
import scent6 from '../assets/images/2.png';
import '../css/FeaturedScents.css';

function FeaturedScents() {
  const scrollRef = useRef(null);

  const scents = [
    { id: 1, name: 'KZ Black', price: '₹999', img: scent1 },
    { id: 2, name: 'KZ Seduced', price: '₹1299', img: scent2 },
    { id: 3, name: 'KZ Sports', price: '₹1499', img: scent3 },
    { id: 4, name: 'KZ Marine', price: '₹1599', img: scent4 },
    { id: 5, name: 'KZ Breeze', price: '₹1099', img: scent5 },
    { id: 6, name: 'KZ Wild', price: '₹1199', img: scent6 },
  ];

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = current.offsetWidth / 3; // Scroll 1 card at a time
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="text-center py-5 bg-light" id="featured">
      <h2 className="best-seller-heading text-center mb-5">Best Sellers</h2>
      <div className="container position-relative">

        <button className="carousel-btn left" onClick={() => scroll('left')}>
          &#8592;
        </button>

        <div className="carousel-container" ref={scrollRef}>
          {scents.map((scent) => (
            <div key={scent.id} className="carousel-card">
              <div className="card h-100 border-0 shadow-sm featured-card">
                <div className="img-hover-wrap">
                  <img src={scent.img} className="card-img-top" alt={scent.name} />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{scent.name}</h5>
                  <p className="card-text fw-bold">{scent.price}</p>
                  <div className="star-rating mb-2">
    <i className="bi bi-star-fill text-warning"></i>
    <i className="bi bi-star-fill text-warning"></i>
    <i className="bi bi-star-fill text-warning"></i>
    <i className="bi bi-star-half text-warning"></i>
    <i className="bi bi-star text-warning"></i>
  </div>
  
                  <button className="btn btn-outline-dark btn-sm rounded-pill">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn right" onClick={() => scroll('right')}>
          &#8594;
        </button>
      </div>
    </section>
  );
}

export default FeaturedScents;
