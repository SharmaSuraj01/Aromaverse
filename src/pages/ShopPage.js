import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Shop.css';
import AddToCartModal from '../components/AddToCartModal';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import { products } from '../data/products';

function ShopPage() {
  const [productList, setProductList] = useState([]);
  const [loadingIds, setLoadingIds] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const {
    cartItems,
    addToCart,
    updateQty,
    removeFromCart,
    showCartModal,
    setShowCartModal,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setProductList(products);
  }, []);

  useEffect(() => {
    if (user) {
      const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.uid}`) || '[]');
      setWishlist(savedWishlist);
    }
  }, [user]);

  const handleAddToCart = (product) => {
    if (loadingIds.includes(product.id)) return;

    setLoadingIds(prev => [...prev, product.id]);

    setTimeout(() => {
      addToCart({ ...product, qty: 1 });
      setLoadingIds(prev => prev.filter(id => id !== product.id));
      setShowCartModal(true);
    }, 300);
  };

  const toggleWishlist = (productId) => {
    if (!user) {
      alert("Login to use wishlist");
      return;
    }

    let updatedWishlist;
    if (wishlist.includes(productId)) {
      updatedWishlist = wishlist.filter(id => id !== productId);
    } else {
      updatedWishlist = [...wishlist, productId];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem(`wishlist_${user.uid}`, JSON.stringify(updatedWishlist));
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <section className="container py-5">
        <h2 className="text-center mb-5 best-seller-heading">All Perfumes</h2>
        <div className="row g-4">
          {productList.map((item) => {
            const isLoading = loadingIds.includes(item.id);
            const isWishlisted = wishlist.includes(item.id);
            const imageUrl = (item.images && item.images[0]) || 'https://via.placeholder.com/300';

            return (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="featured-card h-100 d-flex flex-column">
                  <div
                    className="img-hover-wrap position-relative"
                    onClick={() => handleProductClick(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={imageUrl} alt={item.name} className="w-100" />
                    <div
                      className="position-absolute top-0 end-0 p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item.id);
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
                        className={`bi ${isWishlisted ? 'bi-heart-fill text-danger' : 'bi-heart text-danger'} fs-5`}
                      ></i>
                    </div>
                  </div>

                  <div className="card-body text-center d-flex flex-column pt-3">
                    <h5 className="popup-title">{item.name}</h5>
                    <p className="popup-price">₹{item.price}</p>

                    <button
                      className="btn btn-dark featured-add-btn mt-auto w-100"
                      onClick={() => handleAddToCart(item)}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {showCartModal && (
        <AddToCartModal
          cartItems={cartItems}
          onClose={() => setShowCartModal(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
        />
      )}
    </>
  );
}

export default ShopPage;
