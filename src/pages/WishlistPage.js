import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Shop.css';
import { useAuth } from '../Context/AuthContext';
import { products } from '../data/products';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.uid}`) || '[]');
      setWishlist(savedWishlist);
    }
    setLoading(false);
  }, [user]);

  const handleRemove = (id) => {
    if (!user) return;

    const updatedWishlist = wishlist.filter((itemId) => itemId !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem(`wishlist_${user.uid}`, JSON.stringify(updatedWishlist));
  };

  // Match wishlist IDs with product data
  const wishlistItems = products.filter((item) => wishlist.includes(item.id));

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">My Wishlist</h2>

      {loading ? (
        <p className="text-center">Loading wishlist...</p>
      ) : !user ? (
        <p className="text-center">Please login to view your wishlist 🔒</p>
      ) : wishlistItems.length === 0 ? (
        <p className="text-center">Your wishlist is empty 😔</p>
      ) : (
        <div className="row g-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="featured-card h-100 d-flex flex-column">
                <img
                  src={item.images?.[0] || 'https://via.placeholder.com/150'}
                  alt={item.name}
                  className="w-100"
                />
                <div className="card-body text-center d-flex flex-column pt-3">
                  <h5 className="popup-title">{item.name}</h5>
                  <p className="popup-price">₹{item.price}</p>
                  <div className="d-flex gap-2 justify-content-center mt-auto">
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => navigate('/shop')}
                    >
                      Shop Now
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
