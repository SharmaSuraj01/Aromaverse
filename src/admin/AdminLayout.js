import React from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './components/AdminNavbar';
import { Outlet } from 'react-router-dom';
import './styles/AdminLayout.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
    useEffect(() => {
      setTimeout(() => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (isLoggedIn !== 'true') {
          navigate('/admin/login');
        }
      }, 100); // Slight delay to allow localStorage update
    }, [navigate]);    
  return (
    <div className="admin-layout">
      <Sidebar />
      <AdminNavbar />
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;