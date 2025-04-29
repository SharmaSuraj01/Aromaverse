import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineShoppingCart, MdAssignmentReturn } from 'react-icons/md';
import { FaTags } from 'react-icons/fa';
import { db } from '../firebase'; // Adjust the path to match your project
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // For deleting and fetching items
import { toast } from 'react-toastify'; // Optional, for success/failure messages
import './styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [ecomOpen, setEcomOpen] = useState(true);
  // const [authOpen, setAuthOpen] = useState(false);
  // const [supportOpen, setSupportOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [bannersOpen, setBannersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Local state to store the banners
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Fetch banners from Firestore when the component is mounted
    const fetchBanners = async () => {
      const bannersCollection = collection(db, 'banners'); // Adjust the collection name based on your Firestore structure
      const bannersSnapshot = await getDocs(bannersCollection);
      const bannersList = bannersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBanners(bannersList);
    };

    fetchBanners();
  }, []);

  const isActive = (path) => location.pathname === path;

  // Function to remove an item from Firestore and update the UI
  const handleRemove = async (docId) => {
    try {
      // Remove item from Firestore
      await deleteDoc(doc(db, 'banners', docId)); // Adjust 'banners' to the relevant Firestore collection
      // Remove item from local state to update UI immediately
      setBanners(prevBanners => prevBanners.filter(banner => banner.id !== docId));
      toast.success('Banner removed successfully'); // Optional, show success message
    } catch (error) {
      console.error('Error removing banner:', error);
      toast.error('Failed to remove banner'); // Optional, show error message
    }
  };

  // Function to handle the delete action with confirmation
  const handleDeleteClick = (docId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this item?');
    if (isConfirmed) {
      handleRemove(docId);
    }
  };

  return (
    <div className="sidebar">
      {/* Logo section */}
      <div className="sidebar-logo">
        <img src="/logo.png" alt="Logo" />
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

      {/* Banners Dropdown */}
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
            {/* Render the list of banners */}
            {banners.map((banner) => (
              <div key={banner.id} className="banner-item">
                <Link to={`/admin/banners/${banner.id}`} className={isActive(`/admin/banners/${banner.id}`) ? 'active' : ''}>
                  {banner.name} {/* Adjust according to your Firestore structure */}
                </Link>
                {/* Remove button */}
                <button
                  onClick={() => handleDeleteClick(banner.id)} // Use the handleDeleteClick for confirmation
                  style={{ marginLeft: '10px', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  🗑 Remove
                </button>
              </div>
            ))}
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
