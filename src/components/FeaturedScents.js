import React, { useRef, useState, useEffect } from 'react';
import AddToCartModal from './AddToCartModal';
import ProductDetailModal from './ProductDetailModal';

import '../css/FeaturedScents.css';
import { useCart } from '../Context/CartContext';

import { auth, db } from '../firebase';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';

function FeaturedScents({ filterGender }) {
  const scrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [scents, setScents] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const {
    cartItems,
    setShowCartModal,
    addToCart,
    updateQty,
    removeFromCart,
    showCartModal,
  } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setScents(products);
      } catch (err) {
        console.error('Error loading products:', err);
      }
    };

    fetchProducts();
  }, []);

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

    const updatedWishlist = isInWishlist(item.id)
      ? wishlist.filter((wId) => wId !== item.id)
      : [...wishlist, item.id];

    try {
      await setDoc(doc(db, 'wishlists', user.uid), { items: updatedWishlist });
      setWishlist(updatedWishlist);
    } catch (err) {
      console.error('Error updating wishlist:', err);
    }
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
                  onClick={() => setSelectedProduct(scent)} // ✅ Opens modal with image
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

                  <img
                    src={scent.images?.[0] || 'https://via.placeholder.com/150'}
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
                        handleAddToCart(scent); // ✅ Add to cart + show modal
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

                  <img
                    src={scent.images?.[0] || 'https://via.placeholder.com/150'}
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

      {/* ✅ Add To Cart Modal */}
      {showCartModal && (
        <AddToCartModal
          cartItems={cartItems}
          onClose={() => setShowCartModal(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
        />
      )}

      {/* ✅ Product Detail Modal with image */}
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
