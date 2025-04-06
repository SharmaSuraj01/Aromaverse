import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedScents from './components/FeaturedScents';
import Categories from './components/Categories';
import SignatureCollection from './components/SignatureCollection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <FeaturedScents />
      <Categories />
      <SignatureCollection />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
