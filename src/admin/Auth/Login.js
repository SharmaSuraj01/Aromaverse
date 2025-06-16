import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const validEmail = 'admin@gmail.com';
    const validPassword = 'admin123';

    if (email === validEmail && password === validPassword) {
      setError('');
      alert('Login successful! Welcome Admin 😎');
    
      localStorage.setItem('isAdminLoggedIn', 'true');
    
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 100);
    } else {
      setError('Invalid email or password ❌');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Admin Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/admin/forgot-password">Forgot password?</a>
          </div>

          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

          <button className="auth-btn" type="submit">Login</button>

          <p className="switch-auth">
            Don't have an account? <a href="/admin/signup">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
