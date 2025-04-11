import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import scent1 from '../assets/images/scent1.jpg';
import scent2 from '../assets/images/scent2.jpg';
import scent3 from '../assets/images/scent3.jpg';
import scent4 from '../assets/images/1.png';
import scent5 from '../assets/images/9.png';
import scent6 from '../assets/images/2.png';

import '../css/Shop.css';

import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const scents = [
  { id: 1, name: 'KZ Black', price: 999, img: scent1 },
  { id: 2, name: 'KZ Seduced', price: 1299, img: scent2 },
  { id: 3, name: 'KZ Sports', price: 1499, img: scent3 },
  { id: 4, name: 'KZ Marine', price: 1599, img: scent4 },
  { id: 5, name: 'KZ Breeze', price: 1099, img: scent5 },
  { id: 6, name: 'KZ Wild', price: 1199, img: scent6 },
];

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

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

  const wishlistItems = scents.filter((item) => wishlist.includes(item.id));

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
                <img src={item.img} alt={item.name} className="w-100" />
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
