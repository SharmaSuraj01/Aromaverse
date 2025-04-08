import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/NavbarCustom.css';
import logo from '../assets/images/logo.png'; // Replace with actual logo path
import forHim from '../assets/images/forhim.jpg';
import forHer from '../assets/images/forher.jpg';
import forKids from '../assets/images/forkid.jpg';

const Navbar = () => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);


  const toggleSearchOverlay = () => setShowSearchOverlay(!showSearchOverlay);
  const closeSearchOverlay = () => setShowSearchOverlay(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeSearchOverlay();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
    <div>
    <div className="top-strip">
        Flat 10% OFF, USE CODE: FLAT10 | Flat 20% OFF on orders above 2999 INR (Automatically Applied) | Free Shipping on orders above 999 INR
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top custom-navbar shadow-sm">
  <div className="container-fluid px-4">

    {/* Toggler */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarContent"
      aria-controls="navbarContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* Logo */}
    <a className="navbar-brand d-lg-block me-4" href="/">
      <img src={logo} alt="Kizu Perfumes" className="logo-img" />
    </a>

    {/* Mobile Icons */}
    <div className="d-lg-none d-flex gap-2 ms-auto">
      <button className="btn btn-link text-dark" onClick={toggleSearchOverlay}>
        <i className="bi bi-search fs-5"></i>
      </button>
      <div className="dropdown">
        <button
          className="btn btn-link text-dark"
          id="mobileUserMenu"
          data-bs-toggle="dropdown"
        >
          <i className="bi bi-person fs-5"></i>
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="mobileUserMenu">
          <li><a className="dropdown-item" href="/login">Login</a></li>
          <li><a className="dropdown-item" href="/register">Register</a></li>
        </ul>
      </div>
    </div>

    {/* Nav Links + Desktop Icons */}
    <div className="collapse navbar-collapse" id="navbarContent">

      <ul className="navbar-nav mx-auto nav-center-custom">

        <li className="nav-item px-2">
          <a className="nav-link active" href="/home">HOME</a>
        </li>

        <li className="nav-item mega-dropdown px-2 position-relative">
          <a
            className="nav-link"
            href="/collections"
            onClick={(e) => e.preventDefault()}
          >
            COLLECTIONS
          </a>

          <div className="collections-dropdown-content">
            <div className="collection-list">
              <a href="/collections/him">FOR HIM</a>
              <a href="/collections/her">FOR HER</a>
              <a href="/collections/kids">FOR KIDS</a>
            </div>

            <div className="collection-preview">
              <div className="collection-card">
                <img src={forHim} alt="For Him" />
                <p>For Him</p>
              </div>
              <div className="collection-card">
                <img src={forHer} alt="For Her" />
                <p>For Her</p>
              </div>
              <div className="collection-card">
                <img src={forKids} alt="For Kids" />
                <p>For Kids</p>
              </div>
            </div>
          </div>
        </li>

        <li className="nav-item px-2">
          <a className="nav-link" href="/best-sellers">BEST SELLERS</a>
        </li>

        <li className="nav-item px-2">
          <a className="nav-link" href="/yearly-sample-subscription">YEARLY SAMPLE SUBSCRIPTION</a>
        </li>

      </ul>

      {/* Desktop Icons */}
      <div className="d-none d-lg-flex align-items-center gap-3 ms-3">

{/* Search Icon + Input (Unified Responsive) */}
<div className="search-container d-flex align-items-center position-relative">
  <button
    className="btn btn-link text-dark p-0"
    onClick={() => setShowSearchBox((prev) => !prev)}
  >
    <i className="bi bi-search fs-5"></i>
  </button>

  {showSearchBox && (
    <input
      type="text"
      className="form-control search-input ms-2"
      placeholder="Search..."
      autoFocus
    />
  )}
</div>




  {/* User Icon Dropdown */}
  <div className="dropdown">
    <button
      className="btn btn-link text-dark"
      id="desktopUserMenu"
      data-bs-toggle="dropdown"
    >
      <i className="bi bi-person fs-5"></i>
    </button>
    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="desktopUserMenu">
      <li><a className="dropdown-item" href="/login">Login</a></li>
      <li><a className="dropdown-item" href="/register">Register</a></li>
    </ul>
  </div>

</div>


    </div>
  </div>
</nav>


      {/* Search Overlay */}
      {showSearchOverlay && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center"
          style={{ zIndex: 1055 }}
          onClick={closeSearchOverlay}
        >
          <input
            type="text"
            className="form-control w-75"
            placeholder="Search for perfumes..."
            style={{ maxWidth: '600px', fontSize: '1.25rem' }}
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        </div>
      )}
      </div>
    </>
  );
};

export default Navbar;
