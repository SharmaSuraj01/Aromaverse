import React, { useRef, useState } from 'react';
import AddToCartModal from './AddToCartModal';
import scent1 from '../assets/images/scent1.jpg';
import scent2 from '../assets/images/scent2.jpg';
import scent3 from '../assets/images/scent3.jpg';
import scent4 from '../assets/images/1.png';
import scent5 from '../assets/images/9.png';
import scent6 from '../assets/images/2.png';
import '../css/FeaturedScents.css';

function FeaturedScents({ filterGender }) {
  const scrollRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const scents = [
    { id: 1, name: 'KZ Black', price: 999, img: scent1, gender: 'him' },
    { id: 2, name: 'KZ Seduced', price: 1299, img: scent2, gender: 'her' },
    { id: 3, name: 'KZ Sports', price: 1499, img: scent3, gender: 'him' },
    { id: 4, name: 'KZ Marine', price: 1599, img: scent4, gender: 'her' },
    { id: 5, name: 'KZ Breeze', price: 1099, img: scent5, gender: 'kids' },
    { id: 6, name: 'KZ Wild', price: 1199, img: scent6, gender: 'kids' },
  ];

  const filteredScents = filterGender
    ? scents.filter((scent) => scent.gender === filterGender)
    : scents;

  const handleAddToCart = (product) => {
    const existingIndex = cartItems.findIndex((item) => item.id === product.id);
    if (existingIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].qty += 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    setShowModal(true);
  };

  const updateQty = (index, newQty) => {
    if (newQty < 1) return;
    const updatedItems = [...cartItems];
    updatedItems[index].qty = newQty;
    setCartItems(updatedItems);
  };

  const formatGender = (gender) => {
    if (!gender) return 'All';
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  return (
    <section className="text-center py-5 custom-bg" id="featured">
      <h2 className="best-seller-heading text-center mb-5">
        {filterGender
          ? `Best Sellers - For ${formatGender(filterGender)}`
          : 'Best Sellers'}
      </h2>

      <div className={`container ${filterGender ? '' : 'position-relative'}`}>
        {!filterGender && (
          <button className="carousel-btn left" onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })}>
            &#8592;
          </button>
        )}

        {filterGender ? (
          <div className="row g-4 justify-content-center">
            {filteredScents.map((scent) => (
              <div key={scent.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="card border-0 shadow scent-card h-100">
                  <img src={scent.img} className="card-img-top rounded-3" alt={scent.name} />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-semibold">{scent.name}</h5>
                    <p className="card-text text-muted mb-2">₹{scent.price}</p>
                    <div className="star-rating mb-3">
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-half text-warning"></i>
                      <i className="bi bi-star text-warning"></i>
                    </div>
                    <button
                      className="btn btn-dark btn-sm px-3 rounded-pill"
                      onClick={() => handleAddToCart(scent)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredScents.length === 0 && (
              <p className="text-center py-5">No scents available for this category.</p>
            )}
          </div>
        ) : (
          <div className="carousel-container" ref={scrollRef}>
            {filteredScents.map((scent) => (
              <div key={scent.id} className="carousel-card">
                <div className="card h-100 border-0 shadow-sm featured-card">
                  <div className="img-hover-wrap">
                    <img src={scent.img} className="card-img-top" alt={scent.name} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{scent.name}</h5>
                    <p className="card-text fw-bold">₹{scent.price}</p>
                    <div className="star-rating mb-2">
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-fill text-warning"></i>
                      <i className="bi bi-star-half text-warning"></i>
                      <i className="bi bi-star text-warning"></i>
                    </div>
                    <button
                      className="btn btn-outline-dark btn-sm rounded-pill"
                      onClick={() => handleAddToCart(scent)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!filterGender && (
          <button className="carousel-btn right" onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })}>
            &#8594;
          </button>
        )}
      </div>

      {showModal && (
        <AddToCartModal
          cartItems={cartItems}
          onClose={() => setShowModal(false)}
          onUpdateQty={updateQty}
          onRemove={(index) => {
            const updated = [...cartItems];
            updated.splice(index, 1);
            setCartItems(updated);
          }}
        />
      )}
    </section>
  );
}

export default FeaturedScents;
