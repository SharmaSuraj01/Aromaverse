import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Search Query:', searchQuery);

  };

  return (
    <nav className="admin-navbar">
      <h1>Aromaverse</h1>
      <div className="nav-right">
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
        <button className="icon-btn">
          <i className="fas fa-bell"></i>
          <span className="notification-dot"></span>
        </button>

        <img className="avatar" src="/logo.png" alt="User" />
        <span className="username">Admin</span>
        <button className="settings-btn" onClick={() => navigate('/admin/settings')}>
          <i className="fas fa-cog"></i>
        </button>
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