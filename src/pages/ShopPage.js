import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import '../css/Shop.css';

import AddToCartModal from '../components/AddToCartModal';
import { useCart } from '../Context/CartContext';

import { auth, db } from '../firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
  onSnapshot
} from 'firebase/firestore';

function ShopPage() {
  const [products, setProducts] = useState([]);
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

  const user = auth.currentUser;
  const navigate = useNavigate();  // Hook for navigation

  // Fetch products with real-time updates
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productDocs);
    }, (error) => {
      console.error("Error fetching products:", error);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Fetch wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const docRef = doc(db, 'wishlists', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWishlist(docSnap.data().items || []);
        }
      }
    };

    fetchWishlist();
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

  const toggleWishlist = async (productId) => {
    if (!user) return alert("Login to use wishlist");

    const docRef = doc(db, 'wishlists', user.uid);
    let updated;

    if (wishlist.includes(productId)) {
      await updateDoc(docRef, { items: arrayRemove(productId) });
      updated = wishlist.filter(id => id !== productId);
    } else {
      await setDoc(docRef, { items: arrayUnion(productId) }, { merge: true });
      updated = [...wishlist, productId];
    }

    setWishlist(updated);
  };

  const handleProductClick = (productId) => {
    // Navigate to the product detail page when an image or product is clicked
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <section className="container py-5">
        <h2 className="text-center mb-5 best-seller-heading">All Perfumes</h2>
        <div className="row g-4">
          {products.map((item) => {
            const isLoading = loadingIds.includes(item.id);
            const isWishlisted = wishlist.includes(item.id);
            const imageUrl = (item.images && item.images[0]) || 'https://via.placeholder.com/300';

            return (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="featured-card h-100 d-flex flex-column">
                  <div
                    className="img-hover-wrap position-relative"
                    onClick={() => handleProductClick(item.id)}  // Navigate to product detail page
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
                        top: '5px',  // Adjust the distance from the top of the card
                        right: '5px',  // Adjust the distance from the right of the card
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
