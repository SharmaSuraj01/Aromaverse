import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineShoppingCart, MdAssignmentReturn } from 'react-icons/md';
import { FaTags } from 'react-icons/fa';
import './styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [ecomOpen, setEcomOpen] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [bannersOpen, setBannersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      {/* Logo section */}
      <div className="sidebar-logo">
        <img src="/Logo_Gitammi.png" alt="Logo" />
      </div>

      {/* Sidebar title */}
      <h2 className="sidebar-title">
        <MdOutlineShoppingCart size={24} /> Admin Panel
      </h2>

      {/* eCommerce Section */}
      <div>
        <div className="menu-toggle" onClick={() => setEcomOpen(!ecomOpen)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MdOutlineShoppingCart /> eCommerce
          </div>
          <span>{ecomOpen ? '▾' : '▸'}</span>
        </div>

        {ecomOpen && (
          <div className="submenu">
            <Link to="/admin/dashboard" className={isActive('/admin/dashboard') ? 'active' : ''}>Dashboard</Link>
            <Link to="/admin/products" className={isActive('/admin/products') ? 'active' : ''}>Product List</Link>
            <Link to="/admin/products/add" className={isActive('/admin/products/add') ? 'active' : ''}>Add Product</Link>
            <Link to="/admin/orders" className={isActive('/admin/orders') ? 'active' : ''}>Order List</Link>
            <Link to="/admin/returns" className={isActive('/admin/returns') ? 'active' : ''}>
              <MdAssignmentReturn size={16} style={{ marginRight: '6px' }} />
              Returns
            </Link>
            <Link to="/admin/customers" className={isActive('/admin/customers') ? 'active' : ''}>Customers</Link>
            <Link to="/admin/payments" className={isActive('/admin/Payments') ? 'active' : ''}>Payments</Link>
          </div>
        )}
      </div>

      {/* Authentication Dropdown */}
      <div
        className="hover-group"
        onMouseEnter={() => setAuthOpen(true)}
        onMouseLeave={() => setAuthOpen(false)}
      >
        <div className="menu-toggle">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔐 Authentication
          </div>
          <span>{authOpen ? '▾' : '▸'}</span>
        </div>

        {authOpen && (
          <div className="submenu">
            <Link to="/admin/login" className={isActive('/admin/login') ? 'active' : ''}>Login</Link>
            <Link to="/admin/signup" className={isActive('/admin/signup') ? 'active' : ''}>Signup</Link>
            <Link to="/admin/forgetpassword" className={isActive('/admin/forgotpassword') ? 'active' : ''}>Forgot Password</Link>
            <Link to="/admin/reset-password" className={isActive('/admin/reset-password') ? 'active' : ''}>Reset Password</Link>
            <Link to="/admin/two-factor" className={isActive('/admin/two-factor') ? 'active' : ''}>Two Factor</Link>
          </div>
        )}
      </div>

      {/* Customer Support Dropdown */}
      <div
        className="hover-group"
        onMouseEnter={() => setSupportOpen(true)}
        onMouseLeave={() => setSupportOpen(false)}
      >
        <div className="menu-toggle">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            🧾 Customer Support
          </div>
          <span>{supportOpen ? '▾' : '▸'}</span>
        </div>
        {supportOpen && (
          <div className="submenu">
            <Link to="/admin/support" className={isActive('/admin/support') ? 'active' : ''}>
              Support Tickets
            </Link>
          </div>
        )}
      </div>

      {/* Promotions Dropdown */}
      <div
        className="hover-group"
        onMouseEnter={() => setPromoOpen(true)}
        onMouseLeave={() => setPromoOpen(false)}
      >
        <div className="menu-toggle">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaTags /> Promotions
          </div>
          <span>{promoOpen ? '▾' : '▸'}</span>
        </div>

        {promoOpen && (
          <div className="submenu">
            <Link to="/admin/coupons" className={isActive('/admin/coupons') ? 'active' : ''}>Coupon List</Link>
            <Link to="/admin/coupons/add" className={isActive('/admin/coupons/add') ? 'active' : ''}>Add Coupon</Link>
            <Link to="/admin/flashsale" className={isActive('/admin/flashsale') ? 'active' : ''}>Flash Sale</Link>
          </div>
        )}
      </div>

      {/* Banners Dropdown (Newly Added) */}
      <div
        className="hover-group"
        onMouseEnter={() => setBannersOpen(true)}
        onMouseLeave={() => setBannersOpen(false)}
      >
        <div className="menu-toggle">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            📢 WebSite Managements
          </div>
          <span>{bannersOpen ? '▾' : '▸'}</span>
        </div>

        {bannersOpen && (
          <div className="submenu">
            <Link to="/admin/banners" className={isActive('/admin/banners') ? 'active' : ''}>Add Banners</Link>
            <Link to="/admin/bannersdisplay" className={isActive('/admin/bannersdisplay') ? 'active' : ''}>View Banners</Link>
            <Link to="/admin/Slider" className={isActive('/admin/slider') ? 'active' : ''}>Add Slider</Link>
            <Link to="/admin/FeaturedProducts" className={isActive('/admin/FeaturedProducts') ? 'active' : ''}>Featured Products</Link>
            <Link to="/admin/Bestsellers" className={isActive('/admin/Bestsellers') ? 'active' : ''}>Bestsellers</Link>
            <Link to="/admin/BlogPost" className={isActive('/admin/BlogPost') ? 'active' : ''}>Blog Post</Link>
            <Link to="/admin/SeoSettings" className={isActive('/admin/SeoSettings') ? 'active' : ''}>Seo Settings</Link>
            <Link to="/admin/StaticPagesManager" className={isActive('/admin/StaticPagesManager') ? 'active' : ''}>StaticPagesManager</Link>
          </div>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '☰' : '✖'}
      </button>
    </div>
  );
};

export default Sidebar;
