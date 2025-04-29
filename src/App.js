// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { auth } from './firebase';

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
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import RefundPolicy from './pages/RefundPolicy';
import TermsOfService from './pages/TermsOfService';

import AddToCartModal from './components/AddToCartModal';
import { useCart } from './Context/CartContext';
import ThankYouPage from './pages/ThankYouPage';
import MyProfile from './pages/MyProfile';
import WishlistPage from './pages/WishlistPage';
import OrdersPage from './pages/OrdersPage';

import Support from './pages/Support';
import Returns from './pages/Returns';

import AdminRoutes from './admin/adminRoutes';
import Features from './components/Features';
import ProductDetailPage from './pages/ProductDetailPage';
import MaroonTextSection from './components/MaroonTextSection';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const location = useLocation();

  const {
    cartItems,
    showCartModal,
    setShowCartModal,
    setCartItems,
    updateQty,
    removeFromCart,
  } = useCart();

  const hideNavbar =
    location.pathname.startsWith('/admin') ||
    location.pathname === '/login' ||
    location.pathname === '/register';

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      {!hideNavbar && (
        <Navbar cartItems={cartItems} setShowCartModal={setShowCartModal} />
      )}

      {showCartModal && (
        <AddToCartModal
          cartItems={cartItems}
          onClose={() => setShowCartModal(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features/>
              <FeaturedScents />
              <MaroonTextSection/>
              <Categories />
              <SignatureCollection />
              <Testimonials />
            </>
          }
        />
        
        
        <Route path="/for-him" element={<ForHimPage />} />
        <Route path="/for-her" element={<ForHerPage />} />
        <Route path="/for-kids" element={<ForKidsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login" element={<Navigate to="/login" replace />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/collections/:category" element={<CollectionPage />} />

        <Route
          path="/shop"
          element={
            <ShopPage
              cartItems={cartItems}
              setCartItems={setCartItems}
              setShowCartModal={setShowCartModal}
            />
          }
        />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsAndCOnditions" element={<TermsAndConditions />} />
        <Route path="/RefundPolicy" element={<RefundPolicy />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        
        <Route path="/my-profile" element={<MyProfile />} />
<Route path="/profile" element={<Navigate to="/my-profile" replace />} />


        {/* Other Routes */}
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        <Route path="/support" element={<Support />} />
        <Route path="/returns" element={<Returns />} />
      </Routes>

      {!hideNavbar && <Footer />}
    </div>
  );
}

export default App;
