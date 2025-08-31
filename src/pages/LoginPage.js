import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import AuthLayout from './AuthLayout';
import '../css/AuthPopup.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = () => {
    if (!email) {
      setError('Please enter your email first');
      return;
    }
    setMessage('Password reset instructions sent to your email!');
    setError('');
  };

  return (
    <AuthLayout>
      <form onSubmit={handleLogin}>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        
        <div className="mb-3">
          <label>Email <span className="text-danger">*</span></label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        
        <div className="mb-3">
          <label>Password <span className="text-danger">*</span></label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        
        <div className="mb-3 text-end">
          <small
            className="text-primary"
            style={{ cursor: 'pointer' }}
            onClick={handleResetPassword}
          >
            Forgot your password?
          </small>
        </div>
        
        <button type="submit" className="btn btn-dark w-100 mb-3">
          Login
        </button>
        
        <div className="text-center text-muted mb-2">OR</div>
        
        <button
          type="button"
          className="btn btn-outline-danger w-100"
          onClick={() => {
            // Demo login
            setEmail('demo@aromaverse.com');
            setPassword('demo123');
          }}
        >
          Demo Login
        </button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
