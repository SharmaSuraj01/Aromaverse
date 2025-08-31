import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import AdminNavbar from './components/AdminNavbar';
import { Outlet, useNavigate } from 'react-router-dom';
import './styles/AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/admin/login');
    }
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
