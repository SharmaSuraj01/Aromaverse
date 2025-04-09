import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      {/* Logo */}
      <div className="text-center mb-4">
        <img src="/logo.png" alt="KZ Logo" style={{ width: '100px' }} />
      </div>

      {/* Toggle Buttons */}
      <div className="d-flex justify-content-around mb-3">
        <button
          className={`btn ${isLogin ? 'btn-dark' : 'btn-outline-dark'} w-50`}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className={`btn ${!isLogin ? 'btn-dark' : 'btn-outline-dark'} w-50`}
          onClick={() => navigate('/register')}
        >
          Create Account
        </button>
      </div>

      {/* Actual Form Content */}
      {children}
    </div>
  );
};

export default AuthLayout;
