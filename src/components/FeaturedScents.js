import React, { useRef, useState, useEffect } from 'react';
import AddToCartModal from './AddToCartModal';
import ProductDetailModal from './ProductDetailModal';

import scent1 from '../assets/images/11.JPG';
import scent2 from '../assets/images/12.PNG';
import scent3 from '../assets/images/13.PNG';
import scent4 from '../assets/images/14.JPG';
import scent5 from '../assets/images/15.JPG';
import scent6 from '../assets/images/16.JPG';
import scent7 from '../assets/images/17.JPG';



import '../css/FeaturedScents.css';
import { useCart } from '../Context/CartContext';

import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function FeaturedScents({ filterGender }) {
  const scrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    cartItems,
    setShowCartModal,
    addToCart,
    updateQty,
    removeFromCart,
    showCartModal,
  } = useCart();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const docRef = doc(db, 'wishlists', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWishlist(docSnap.data().items || []);
        }
      } catch (err) {
        console.error('Error loading wishlist:', err);
      }
    };
    fetchWishlist();
  }, []);

  const isInWishlist = (id) => wishlist.includes(id);

  const toggleWishlist = async (item) => {
    const user = auth.currentUser;
    if (!user) return alert('Please log in to use wishlist.');

    let updatedWishlist;
    if (isInWishlist(item.id)) {
      updatedWishlist = wishlist.filter((wId) => wId !== item.id);
    } else {
      updatedWishlist = [...wishlist, item.id];
    }

    try {
      await setDoc(doc(db, 'wishlists', user.uid), { items: updatedWishlist });
      setWishlist(updatedWishlist);
    } catch (err) {
      console.error('Error updating wishlist:', err);
    }
  };

  const scents = [
    { id: 1, name: 'TITANIUM', price: 999, img: scent1, gender: 'her' },
    { id: 2, name: 'AQUA', price: 1299, img: scent2, gender: 'him' },
    { id: 3, name: 'YODHA', price: 1499, img: scent3, gender: 'him' },
    { id: 4, name: 'VAHINI', price: 1599, img: scent4, gender: 'kids' },
    { id: 5, name: 'VAASNA', price: 1099, img: scent5, gender: 'him' },
    { id: 6, name: 'SENORA', price: 1199, img: scent6, gender: 'her' },
    { id: 7, name: 'TANTRA', price: 1099, img: scent7, gender: 'him' },
    
    
  ];

  const filteredScents = filterGender
    ? scents.filter((scent) => scent.gender === filterGender)
    : scents;

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowCartModal(true);
  };

  const formatGender = (gender) => {
    if (!gender) return 'All';
    return gender.charAt(0).toUpperCase() + gender.slice(1);
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
                  onClick={() => setSelectedProduct(scent)}
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
                      top: '10px',
                      right: '10px',
                      cursor: 'pointer',
                      zIndex: 2,
                    }}
                  >
                    <i
                      className={`bi ${isInWishlist(scent.id) ? 'bi-heart-fill' : 'bi-heart'} text-danger fs-4`}
                    ></i>
                  </div>

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
              <p className="text-center py-5">No scents available for this category.</p>
            )}
          </div>
        ) : (
          <div className="carousel-container" ref={scrollRef}>
            {filteredScents.map((scent) => (
              <div key={scent.id} className="carousel-card">
                <div
                  className="card h-100 border-0 shadow-sm featured-card position-relative"
                  onClick={() => setSelectedProduct(scent)}
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
                      top: '10px',
                      right: '10px',
                      cursor: 'pointer',
                      zIndex: 2,
                    }}
                  >
                    <i
                      className={`bi ${isInWishlist(scent.id) ? 'bi-heart-fill' : 'bi-heart'} text-danger fs-4`}
                    ></i>
                  </div>

                  <img src={scent.img} className="card-img-top" alt={scent.name} />
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

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            handleAddToCart(product);
            setSelectedProduct(null);
          }}
        />
      )}
    </section>
  );
}

export default FeaturedScents;
