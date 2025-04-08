import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedScents from './components/FeaturedScents';
import Categories from './components/Categories';
import SignatureCollection from './components/SignatureCollection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ForHimPage from './components/ForHimPage';
import ForHerPage from './components/ForHerPage';
import ForKidsPage from './components/ForKidsPage';
import './App.css'; // If you have custom styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  return (
    <>
      <Hero />
      <FeaturedScents />
      <Categories />
      <SignatureCollection />
      <Testimonials />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/for-him" element={<ForHimPage />} />
        <Route path="/for-her" element={<ForHerPage />} />
        <Route path="/for-kids" element={<ForKidsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
