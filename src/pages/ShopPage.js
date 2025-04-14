import React, { useState, useEffect } from 'react';
import scent1 from '../assets/images/11.JPG';
import scent2 from '../assets/images/12.PNG';
import scent3 from '../assets/images/13.PNG';
import scent4 from '../assets/images/14.JPG';
import scent5 from '../assets/images/15.JPG';
import scent6 from '../assets/images/16.JPG';
import scent7 from '../assets/images/17.JPG';
import scent8 from '../assets/images/18.JPG';

import '../css/Shop.css';

import AddToCartModal from '../components/AddToCartModal';
import ProductDetailModal from '../components/ProductDetailModal';
import { useCart } from '../Context/CartContext';

import { auth, db } from '../firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';

const scents = [
  { id: 1, name: 'TITANIUM', price: 999, img: scent1, gender: 'her' },
      { id: 2, name: 'AQUA', price: 1299, img: scent2, gender: 'him' },
      { id: 3, name: 'YODHA', price: 1499, img: scent3, gender: 'him' },
      { id: 4, name: 'VAHINI', price: 1599, img: scent4, gender: 'kids' },
      { id: 5, name: 'VAASNA', price: 1099, img: scent5, gender: 'him' },
      { id: 6, name: 'SENORA', price: 1199, img: scent6, gender: 'her' },
      { id: 7, name: 'TANTRA', price: 1099, img: scent7, gender: 'him' },
      { id: 8, name: 'UJJWALA', price: 1299, img: scent8, gender: 'her' },
      
];

function ShopPage() {
  const [quantities, setQuantities] = useState({});
  const [loadingIds, setLoadingIds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  // ✅ Load wishlist from Firestore
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

  const handleQtyChange = (id, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    if (loadingIds.includes(product.id)) return;

    setLoadingIds((prev) => [...prev, product.id]);

    setTimeout(() => {
      addToCart({ ...product, qty });
      setLoadingIds((prev) => prev.filter((id) => id !== product.id));
      setShowCartModal(true);
    }, 300);
  };

  const toggleWishlist = async (productId) => {
    if (!user) return alert("Login to use wishlist");

    const docRef = doc(db, 'wishlists', user.uid);

    let updated;
    if (wishlist.includes(productId)) {
      await updateDoc(docRef, {
        items: arrayRemove(productId)
      });
      updated = wishlist.filter((id) => id !== productId);
    } else {
      await setDoc(
        docRef,
        { items: arrayUnion(productId) },
        { merge: true }
      );
      updated = [...wishlist, productId];
    }

    setWishlist(updated);
  };

  return (
    <>
      <section className="container py-5">
        <h2 className="text-center mb-5 best-seller-heading">All Perfumes</h2>
        <div className="row g-4">
          {scents.map((item) => {
            const isLoading = loadingIds.includes(item.id);
            const isWishlisted = wishlist.includes(item.id);

            return (
              <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <div className="featured-card h-100 d-flex flex-column">
                  <div
                    className="img-hover-wrap position-relative"
                    onClick={() => setSelectedProduct(item)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={item.img} alt={item.name} className="w-100" />
                    <div
                      className="position-absolute top-0 end-0 p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(item.id);
                      }}
                    >
                      <i
                        className={`bi ${
                          isWishlisted ? 'bi-heart-fill text-danger' : 'bi-heart'
                        } fs-5`}
                      ></i>
                    </div>
                  </div>

                  <div className="card-body text-center d-flex flex-column pt-3">
                    <h5 className="popup-title">{item.name}</h5>
                    <p className="popup-price">₹{item.price}</p>

                    <div className="d-flex justify-content-center align-items-center mb-3">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleQtyChange(item.id, -1)}
                      >
                        −
                      </button>
                      <span className="mx-3">{quantities[item.id] || 1}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleQtyChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>

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
    </>
  );
}

export default ShopPage;
