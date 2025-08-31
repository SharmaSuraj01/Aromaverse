import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineShoppingCart, MdAssignmentReturn } from 'react-icons/md';
import { FaTags } from 'react-icons/fa';
import './styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [ecomOpen, setEcomOpen] = useState(true);
  const [promoOpen, setPromoOpen] = useState(false);
  const [bannersOpen, setBannersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Load banners from localStorage instead of Firebase
    const savedBanners = JSON.parse(localStorage.getItem('banners') || '[]');
    setBanners(savedBanners.map((banner, index) => ({ id: index.toString(), name: `Banner ${index + 1}` })));
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleRemove = (docId) => {
    try {
      const updatedBanners = banners.filter(banner => banner.id !== docId);
      setBanners(updatedBanners);
      
      // Update localStorage
      const savedBanners = JSON.parse(localStorage.getItem('banners') || '[]');
      const newBanners = savedBanners.filter((_, index) => index.toString() !== docId);
      localStorage.setItem('banners', JSON.stringify(newBanners));
      
      alert('Banner removed successfully');
    } catch (error) {
      console.error('Error removing banner:', error);
      alert('Failed to remove banner');
    }
  };

  const handleDeleteClick = (docId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      handleRemove(docId);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>

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

      {/* Website Management Dropdown */}
      <div
        className="hover-group"
        onMouseEnter={() => setBannersOpen(true)}
        onMouseLeave={() => setBannersOpen(false)}
      >
        <div className="menu-toggle">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            📢 Website Management
          </div>
          <span>{bannersOpen ? '▾' : '▸'}</span>
        </div>

        {bannersOpen && (
          <div className="submenu">
            <Link to="/admin/banners" className={isActive('/admin/banners') ? 'active' : ''}>Upload Banners</Link>
            <Link to="/admin/bannersdisplay" className={isActive('/admin/bannersdisplay') ? 'active' : ''}>View Banners</Link>
            <Link to="/admin/slider" className={isActive('/admin/slider') ? 'active' : ''}>Slider Upload</Link>
            <Link to="/admin/FeaturedProducts" className={isActive('/admin/FeaturedProducts') ? 'active' : ''}>Featured Products</Link>
            <Link to="/admin/BlogPost" className={isActive('/admin/BlogPost') ? 'active' : ''}>Blog Posts</Link>
            <Link to="/admin/SeoSettings" className={isActive('/admin/SeoSettings') ? 'active' : ''}>SEO Settings</Link>
            <Link to="/admin/StaticPagesManager" className={isActive('/admin/StaticPagesManager') ? 'active' : ''}>Static Pages</Link>
            <Link to="/admin/Bestsellers" className={isActive('/admin/Bestsellers') ? 'active' : ''}>Best Sellers</Link>
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
