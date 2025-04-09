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
import ShopPage from './pages/ShopPage';


function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const location = useLocation();
  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedScents />
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
        <Route path="/shop" element={<ShopPage />} />

      </Routes>
    </div>
  );
}

export default App;
