import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Kizu Perfumes</div>
      <ul className="navbar__links">
        <li><a href="#featured">Featured</a></li>
        <li><a href="#categories">Shop</a></li>
        <li><a href="#signature">Signature</a></li>
        <li><a href="#testimonials">Testimonials</a></li>
        <div className="navbar__right-icons">
        <FaSearch className="navbar__icon" />
        <FaBell className="navbar__icon" />
      </div>
      </ul>
      {/* <div className="navbar__right-icons">
        <FaSearch className="navbar__icon" />
        <FaBell className="navbar__icon" />
      </div> */}
    </nav>
  );
}

export default Navbar;
