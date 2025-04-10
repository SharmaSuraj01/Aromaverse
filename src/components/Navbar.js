import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/NavbarCustom.css';
import logo from '../assets/images/logo.png';
import forHim from '../assets/images/forhim.jpg';
import forHer from '../assets/images/forher.jpg';
import forKids from '../assets/images/forkid.jpg';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const Navbar = () => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { cartItems, setShowCartModal } = useCart();

  const toggleSearchOverlay = () => setShowSearchOverlay(!showSearchOverlay);
  const closeSearchOverlay = () => setShowSearchOverlay(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeSearchOverlay();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleLogout = () => {
    console.log("Logged out");
    setIsLoggedIn(false);
  };

  const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <>
      <div>
        <div className="top-strip">
          Flat 10% OFF, USE CODE: FLAT10 | Flat 20% OFF on orders above 2999 INR (Automatically Applied) | Free Shipping on orders above 999 INR
        </div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top custom-navbar shadow-sm">
          <div className="container-fluid px-3 px-md-4">

            {/* Mobile Layout */}
            <div className="d-flex align-items-center justify-content-between w-100 d-lg-none">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span className="navbar-toggler-icon"></span>
              </button>

              <a className="navbar-brand mx-lg-0 mx-auto" href="/">
                <img src={logo} alt="Kizu Perfumes" className="logo-img" />
              </a>

              <div className="d-flex gap-2">
                <button className="btn btn-link text-dark p-0" onClick={toggleSearchOverlay}>
                  <i className="bi bi-search fs-5"></i>
                </button>

                <button className="btn btn-link text-dark position-relative p-0" onClick={() => setShowCartModal(true)}>
                  <i className="bi bi-cart fs-5"></i>
                  {totalQty > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalQty}
                    </span>
                  )}
                </button>

                <div className="dropdown">
                  <button className="btn btn-link text-dark p-0" id="mobileUserMenu" data-bs-toggle="dropdown">
                    <i className="bi bi-person-circle fs-5"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="mobileUserMenu">
                    {isLoggedIn ? (
                      <>
                        <li className="dropdown-header fw-semibold text-dark px-3">Welcome, User</li>
                        <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person me-2"></i>My Profile</Link></li>
                        <li><Link className="dropdown-item" to="/cart"><i className="bi bi-cart-check me-2"></i>My Cart</Link></li>
                        <li><Link className="dropdown-item" to="/orders"><i className="bi bi-box-seam me-2"></i>My Orders</Link></li>
                        <li><Link className="dropdown-item" to="/wishlist"><i className="bi bi-heart me-2"></i>Wishlist</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                      </>
                    ) : (
                      <>
                        <li><Link className="dropdown-item" to="/login"><i className="bi bi-box-arrow-in-right me-2"></i>Login</Link></li>
                        <li><Link className="dropdown-item" to="/register"><i className="bi bi-person-plus me-2"></i>Register</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Desktop Logo - only visible on lg+ */}
            <a className="navbar-brand d-none d-lg-block me-4" href="/">
              <img src={logo} alt="Kizu Perfumes" className="logo-img" />
            </a>

            <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarContent">
              <ul className="navbar-nav mx-auto nav-center-custom">
                <li className="nav-item px-2">
                  <a className="nav-link active" href="/">HOME</a>
                </li>

                <li className="nav-item mega-dropdown px-2 position-relative">
                  <span className="nav-link dropdown-toggle">COLLECTIONS</span>
                  <div className="collections-dropdown-content">
                    <div className="collection-list">
                      <Link to="/collections/for-him">FOR HIM</Link>
                      <Link to="/collections/for-her">FOR HER</Link>
                      <Link to="/collections/kids">FOR KIDS</Link>
                    </div>
                    <div className="collection-preview">
                      <Link to="/collections/for-him" className="collection-card">
                        <img src={forHim} alt="For Him" />
                        <p>For Him</p>
                      </Link>
                      <Link to="/collections/for-her" className="collection-card">
                        <img src={forHer} alt="For Her" />
                        <p>For Her</p>
                      </Link>
                      <Link to="/collections/kids" className="collection-card">
                        <img src={forKids} alt="For Kids" />
                        <p>For Kids</p>
                      </Link>
                    </div>
                  </div>
                </li>

                <li className="nav-item px-2">
                  <Link to="/shop" className="nav-link">SHOP</Link>
                </li>

                <li className="nav-item px-2">
                  <Link to="/contact" className="nav-link">CONTACT US</Link>
                </li>
              </ul>

              <div className="d-none d-lg-flex align-items-center gap-3 ms-3">
                <div className="search-container d-flex align-items-center position-relative">
                  <button className="btn btn-link text-dark p-0" onClick={() => setShowSearchBox(prev => !prev)}>
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

                <button className="btn btn-link text-dark position-relative p-0" onClick={() => setShowCartModal(true)}>
                  <i className="bi bi-cart fs-5"></i>
                  {totalQty > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalQty}
                    </span>
                  )}
                </button>

                <div className="dropdown">
                  <button className="btn btn-link text-dark p-0" id="desktopUserMenu" data-bs-toggle="dropdown">
                    <i className="bi bi-person-circle fs-5"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="desktopUserMenu">
                    {isLoggedIn ? (
                      <>
                        <li className="dropdown-header fw-semibold text-dark px-3">Welcome, User</li>
                        <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person me-2"></i>My Profile</Link></li>
                        <li><Link className="dropdown-item" to="/cart"><i className="bi bi-cart-check me-2"></i>My Cart</Link></li>
                        <li><Link className="dropdown-item" to="/orders"><i className="bi bi-box-seam me-2"></i>My Orders</Link></li>
                        <li><Link className="dropdown-item" to="/wishlist"><i className="bi bi-heart me-2"></i>Wishlist</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item text-danger" onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
                      </>
                    ) : (
                      <>
                        <li><Link className="dropdown-item" to="/login"><i className="bi bi-box-arrow-in-right me-2"></i>Login</Link></li>
                        <li><Link className="dropdown-item" to="/register"><i className="bi bi-person-plus me-2"></i>Register</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

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
