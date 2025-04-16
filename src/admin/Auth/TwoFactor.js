import React, { useState } from 'react';
import '../styles/Auth.css';
import { Link } from 'react-router-dom';

const TwoFactor = () => {
  const [code, setCode] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    if (code === '123456') {
      alert('Two-Factor Verified 🎉');
    } else {
      alert('Invalid Code ❌');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Two-Factor Authentication</h2>
        <p>Enter the 6-digit code sent to your email or phone</p>

        <form className="auth-form" onSubmit={handleVerify}>
          <div className="form-group">
            <label>Verification Code</label>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={6}
            />
          </div>

          <button className="auth-btn" type="submit">Verify</button>

          <div className="form-options">
            <Link to="/admin/login">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoFactor;
