import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);
    // Add logic to handle search functionality
  };

  return (
    <nav className="admin-navbar">
      {/* Left Title or Logo */}
      <h1>Aromaverse</h1>

      {/* Right Side */}
      <div className="nav-right">
        {/* Search */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Notification */}
        <button className="icon-btn">
          <i className="fas fa-bell"></i>
          <span className="notification-dot"></span>
        </button>

        {/* Avatar */}
        <img className="avatar" src="/logo.png" alt="User" />

        {/* Logout Button */}
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem('isAdminLoggedIn');
            navigate('/admin/login');
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;