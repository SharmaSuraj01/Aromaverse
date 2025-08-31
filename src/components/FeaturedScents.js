import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FeaturedScents.css';
import { useCart } from '../Context/CartContext';
import { products } from '../data/products';
import AddToCartModal from '../components/AddToCartModal';

function FeaturedScents({ filterGender }) {
  const scrollRef = useRef(null);
  const [scents, setScents] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const {
    cartItems,
    setShowCartModal,
    addToCart,
    updateQty,
    removeFromCart,
    showCartModal,
  } = useCart();

  useEffect(() => {
    setScents(products);
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  const isInWishlist = (id) => wishlist.includes(id);

  const toggleWishlist = (item) => {
    const updatedWishlist = isInWishlist(item.id)
      ? wishlist.filter((wId) => wId !== item.id)
      : [...wishlist, item.id];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const normalize = (str) =>
    str?.toLowerCase().replace(/\s+/g, '-').trim();

  const filteredScents = filterGender
    ? scents.filter((scent) => {
        const category = normalize(scent.category);
        const filter = normalize(filterGender);
        return category.includes(filter);
      })
    : scents;

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowCartModal(true);
  };

  const formatGender = (gender) => {
    if (!gender) return 'All';
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="text-center py-5 custom-bg" id="featured">
      <h2 className="best-seller-heading text-center mb-5">
        {filterGender ? `Best Sellers - For ${formatGender(filterGender)}` : 'Best Sellers'}
      </h2>

      <div className={`container ${filterGender ? '' : 'position-relative'}`}>
        {!filterGender && (
          <button
            className="carousel-btn left"
            onClick={() => scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
          >
            &#8592;
          </button>
        )}

        {filterGender ? (
          <div className="row g-4 justify-content-center">
            {filteredScents.map((scent) => (
              <div key={scent.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div
                  className="card border-0 shadow scent-card h-100 position-relative"
                  onClick={() => handleProductClick(scent.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(scent);
                    }}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      cursor: 'pointer',
                      zIndex: 2,
                    }}
                  >
                    <i
                      className={`bi ${isInWishlist(scent.id) ? 'bi-heart-fill' : 'bi-heart'} text-danger fs-4`}
                    ></i>
                  </div>

                  <img
                    src={scent.images?.[0]}
                    className="card-img-top rounded-3"
                    alt={scent.name}
                  />
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
                      className="btn btn-dark w-100 mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(scent);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredScents.length === 0 && (
              <p className="text-center py-5 text-danger">
                No products matched the category "{filterGender}".
              </p>
            )}
          </div>
        ) : (
          <div className="carousel-container" ref={scrollRef}>
            {filteredScents.map((scent) => (
              <div key={scent.id} className="carousel-card">
                <div
                  className="card h-100 border-0 shadow-sm featured-card position-relative"
                  onClick={() => handleProductClick(scent.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    className="wishlist-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(scent);
                    }}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      cursor: 'pointer',
                      zIndex: 2,
                    }}
                  >
                    <i
                      className={`bi ${isInWishlist(scent.id) ? 'bi-heart-fill' : 'bi-heart'} text-danger fs-4`}
                    ></i>
                  </div>

                  <img
                    src={scent.images?.[0]}
                    className="card-img-top"
                    alt={scent.name}
                  />
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
                      className="btn btn-dark w-100 mt-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(scent);
                      }}
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
          <button
            className="carousel-btn right"
            onClick={() => scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
          >
            &#8594;
          </button>
        )}
      </div>

      {showCartModal && (
        <AddToCartModal
          cartItems={cartItems}
          onClose={() => setShowCartModal(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
        />
      )}
    </section>
  );
}

export default FeaturedScents;
