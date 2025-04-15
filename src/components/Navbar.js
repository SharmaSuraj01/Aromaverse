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
import scent1 from '../assets/images/11.png';
import scent2 from '../assets/images/12.PNG';
import scent3 from '../assets/images/13.PNG';
import scent4 from '../assets/images/14.JPG';
import scent5 from '../assets/images/15.JPG';
import scent6 from '../assets/images/16.JPG';
import scent7 from '../assets/images/17.JPG';
import { onAuthStateChanged } from 'firebase/auth';

const scents = [
  { id: 1, name: 'TEJASI', price: 999, img: scent1, gender: 'her' },
  { id: 2, name: 'AQUA', price: 1299, img: scent2, gender: 'him' },
  { id: 3, name: 'YODHA', price: 1499, img: scent3, gender: 'him' },
  { id: 4, name: 'VAHINI', price: 1599, img: scent4, gender: 'kids' },
  { id: 5, name: 'VAASNA', price: 1099, img: scent5, gender: 'him' },
  { id: 6, name: 'SENORA', price: 1199, img: scent6, gender: 'her' },
  { id: 7, name: 'TANTRA', price: 1099, img: scent7, gender: 'him' },
];

const Navbar = () => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [userName, setUserName] = useState('');

  const { cartItems, setShowCartModal } = useCart();
  const navigate = useNavigate();

  const toggleSearchOverlay = () => setShowSearchOverlay(!showSearchOverlay);
  const closeSearchOverlay = () => {
    setShowSearchOverlay(false);
    setSearchQuery('');
  };

  const filteredResults = scents.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.displayName || user.email || 'User');
      } else {
        setIsLoggedIn(false);
        setUserName('');
      }
    });

    const handleEsc = (e) => {
      if (e.key === 'Escape') closeSearchOverlay();
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      unsubscribe();
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

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

  const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);

  return (
    <>
      <div>
        <div className="top-strip">
          Flat 10% OFF, USE CODE: FLAT10 | Flat 20% OFF on orders above 2999 INR (Automatically Applied) | Free Shipping on orders above 999 INR
        </div>

        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top custom-navbar shadow-sm">
          <div className="container-fluid px-3 px-md-4">
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

                {/* Wishlist button - Mobile */}
                <button className="btn btn-link text-dark p-0" onClick={() => navigate('/wishlist')}>
                  <i className="bi bi-heart fs-5"></i>
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
                        <li className="dropdown-header fw-semibold text-dark px-3">Welcome, {userName}</li>
                        <li><Link className="dropdown-item" to="/profile"><i className="bi bi-person me-2"></i>My Profile</Link></li>
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
                    <div className="collection-preview d-none d-lg-flex">
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
                <button className="btn btn-link text-dark p-0" onClick={toggleSearchOverlay}>
                  <i className="bi bi-search fs-5"></i>
                </button>

                {/* Wishlist button - Desktop */}
                <button className="btn btn-link text-dark p-0" onClick={() => navigate('/wishlist')}>
                  <i className="bi bi-heart fs-5"></i>
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
                  <button className="btn btn-link text-dark p-0" id="desktopUserMenu" data-bs-toggle="dropdown">
                    <i className="bi bi-person-circle fs-5"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="desktopUserMenu">
                    {isLoggedIn ? (
                      <>
                        <li className="dropdown-header fw-semibold text-dark px-3">Welcome, {userName}</li>
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

        {showSearchOverlay && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex flex-column align-items-center pt-5"
            style={{ zIndex: 1055 }}
            onClick={closeSearchOverlay}
          >
            <div
              className="bg-white rounded p-3"
              style={{ width: '90%', maxWidth: '500px' }}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Search for perfumes..."
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {filteredResults.length > 0 ? (
                <div className="list-group" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {filteredResults.map((item) => (
                    <div
                      key={item.id}
                      className="list-group-item list-group-item-action d-flex align-items-center"
                      onClick={() => {
                        navigate(`/shop`);
                        closeSearchOverlay();
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={item.img} alt={item.name} width="40" className="me-2 rounded" />
                      <div>
                        <div className="fw-semibold">{item.name}</div>
                        <div className="text-muted">₹{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchQuery.trim() !== '' ? (
                <div className="text-muted text-center">No results found.</div>
              ) : null}
            </div>
          </div>
        )}

        {showLogoutMessage && (
          <div
            className="position-fixed top-50 start-50 translate-middle bg-white text-center border p-4 rounded shadow"
            style={{ zIndex: 1060, minWidth: '300px' }}
          >
            <h5 className="text-success mb-2">Logged out successfully!</h5>
            <p>You have been securely signed out.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
