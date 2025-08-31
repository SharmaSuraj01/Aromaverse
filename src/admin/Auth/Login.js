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
      localStorage.setItem('isAdminLoggedIn', 'true');
      alert('Login successful! Welcome Admin 😎');
      navigate('/admin/dashboard'); // Direct navigation
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
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="admin123"
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
        
        {/* Demo Credentials */}
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: admin@gmail.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
