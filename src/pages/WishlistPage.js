import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Shop.css';

import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch wishlist items (IDs) for current user
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setWishlist([]);
          setLoading(false);
          return;
        }

        const docRef = doc(db, 'wishlists', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setWishlist(data.items || []);
        } else {
          setWishlist([]);
        }
      } catch (err) {
        console.error('Error fetching wishlist:', err);
        setWishlist([]);
      }
    };

    fetchWishlist();
  }, []);

  // Fetch all products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const allProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(allProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Remove from wishlist
  const handleRemove = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    const updatedWishlist = wishlist.filter((itemId) => itemId !== id);
    setWishlist(updatedWishlist);

    try {
      await setDoc(doc(db, 'wishlists', user.uid), { items: updatedWishlist });
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
    }
  };

  // Match wishlist IDs with product data
  const wishlistItems = products.filter((item) => wishlist.includes(item.id));

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">My Wishlist</h2>

      {loading ? (
        <p className="text-center">Loading wishlist...</p>
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
