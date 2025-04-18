import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminNavbar.css';

const AdminNavbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="admin-navbar">
      {/* Left Title or Logo */}
      <h1>GITAAMI</h1>

      {/* Right Side */}
      <div className="nav-right">
        {/* Search */}
        <div className="nav-search">
          <input type="text" placeholder="Search..." />
          <i className="fas fa-search"></i>
        </div>

        {/* Notification */}
        <button className="icon-btn">
          <i className="fas fa-bell"></i>
          <span className="notification-dot"></span>
        </button>

        {/* Avatar */}
        <img className="avatar" src="/Gitammi_Logo.JPG" alt="User" />

        {/* Logout Button */}
        <button className='logout-btn' onClick={() => {
          localStorage.removeItem('isAdminLoggedIn');
          navigate('/admin/login');
          }}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
