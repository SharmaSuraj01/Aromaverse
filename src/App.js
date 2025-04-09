import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { auth } from './firebase';

import 'bootstrap-icons/font/bootstrap-icons.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedScents from './components/FeaturedScents';
import Categories from './components/Categories';
import SignatureCollection from './components/SignatureCollection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import ForHimPage from './components/ForHimPage';
import ForHerPage from './components/ForHerPage';
import ForKidsPage from './components/ForKidsPage';
import CollectionPage from './pages/CollectionsPage';

import AddToCartModal from './components/AddToCartModal';

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  const handleUpdateQty = (index, qty) => {
    if (qty < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].qty = qty;
    setCartItems(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  return (
    <div className="App">
      {!hideNavbar && (
        <Navbar
          cartItems={cartItems}
          setShowCartModal={setShowCartModal}
        />
      )}

      {showCartModal && (
        <AddToCartModal
          cartItems={cartItems}
          onClose={() => setShowCartModal(false)}
          onUpdateQty={handleUpdateQty}
          onRemove={handleRemove}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedScents
                addToCart={(item) => {
                  const existingIndex = cartItems.findIndex((i) => i.id === item.id);
                  if (existingIndex !== -1) {
                    const updated = [...cartItems];
                    updated[existingIndex].qty += 1;
                    setCartItems(updated);
                  } else {
                    setCartItems([...cartItems, { ...item, qty: 1 }]);
                  }
                  setShowCartModal(true);
                }}
              />
              <Categories />
              <SignatureCollection />
              <Testimonials />
              <Footer />
            </>
          }
        />
        <Route path="/for-him" element={<ForHimPage />} />
        <Route path="/for-her" element={<ForHerPage />} />
        <Route path="/for-kids" element={<ForKidsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/collections/:category" element={<CollectionPage />} />
      </Routes>
    </div>
  );
}

export default App;
