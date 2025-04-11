import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../css/NavbarCustom.css';
import logo from '../assets/images/logo.png';
import forHim from '../assets/images/forhim.jpg';
import forHer from '../assets/images/forher.jpg';
import forKids from '../assets/images/forkid.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { auth } from '../firebase';

// Example scents data (ideally move this to a separate file or context)
const scents = [
  { id: 1, name: 'KZ Black', price: 999 },
  { id: 2, name: 'KZ Seduced', price: 1299 },
  { id: 3, name: 'KZ Sports', price: 1499 },
  { id: 4, name: 'KZ Marine', price: 1599 },
  { id: 5, name: 'KZ Breeze', price: 1099 },
  { id: 6, name: 'KZ Wild', price: 1199 },
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  const { cartItems, setShowCartModal } = useCart();
  const navigate = useNavigate();
  const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowSearchOverlay(false);
        setFilteredResults([]);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setFilteredResults([]);
      return;
    }

    const results = scents.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredResults(results);
  };

  const handleResultClick = (id) => {
    navigate(`/product/${id}`);
    setSearchTerm('');
    setFilteredResults([]);
    setShowSearchOverlay(false);
    setShowSearchBox(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      setShowLogoutMessage(true);
      setTimeout(() => {
        setShowLogoutMessage(false);
        navigate('/');
      }, 2500);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
                <button className="btn btn-link text-dark p-0" onClick={() => setShowSearchOverlay(true)}>
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
                        <li><Link className="dropdown-item" to="/my-profile"><i className="bi bi-person me-2"></i>My Profile</Link></li>
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

            {/* Desktop */}
            <a className="navbar-brand d-none d-lg-block me-4" href="/">
              <img src={logo} alt="Kizu Perfumes" className="logo-img" />
            </a>

            <div className="collapse navbar-collapse mt-2 mt-lg-0" id="navbarContent">
              <ul className="navbar-nav mx-auto nav-center-custom">
                <li className="nav-item px-2"><a className="nav-link active" href="/">HOME</a></li>
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
                <li className="nav-item px-2"><Link to="/shop" className="nav-link">SHOP</Link></li>
                <li className="nav-item px-2"><Link to="/contact" className="nav-link">CONTACT US</Link></li>
              </ul>

              <div className="d-none d-lg-flex align-items-center gap-3 ms-3 position-relative">
                {/* Desktop Search Bar */}
                <div className="search-container d-flex align-items-center position-relative">
                  <button className="btn btn-link text-dark p-0" onClick={() => setShowSearchBox(prev => !prev)}>
                    <i className="bi bi-search fs-5"></i>
                  </button>
                  {showSearchBox && (
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control search-input ms-2"
                        placeholder="Search..."
                        autoFocus
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      {filteredResults.length > 0 && (
                        <ul className="search-suggestions list-group position-absolute w-100 mt-1 shadow z-3">
                          {filteredResults.map((item) => (
                            <li
                              key={item.id}
                              className="list-group-item list-group-item-action"
                              onClick={() => handleResultClick(item.id)}
                              style={{ cursor: 'pointer' }}
                            >
                              {item.name} – ₹{item.price}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
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

                {/* Profile Dropdown */}
                <div className="dropdown">
                  <button className="btn btn-link text-dark p-0" id="desktopUserMenu" data-bs-toggle="dropdown">
                    <i className="bi bi-person-circle fs-5"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="desktopUserMenu">
                    {isLoggedIn ? (
                      <>
                        <li className="dropdown-header fw-semibold text-dark px-3">Welcome, User</li>
                        <li><Link className="dropdown-item" to="/my-profile"><i className="bi bi-person me-2"></i>My Profile</Link></li>
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

        {showLogoutMessage && (
          <div className="position-fixed top-50 start-50 translate-middle bg-white text-center border p-4 rounded shadow" style={{ zIndex: 1060, minWidth: '300px' }}>
            <h5 className="text-success mb-2">Logged out successfully!</h5>
            <p>You have been securely signed out.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
