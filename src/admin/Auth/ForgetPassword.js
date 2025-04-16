import React from 'react';
import '../styles/ForgotPassword.css';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  return (
    <div className="forget-container">
      {/* Left grid handled by CSS ::before */}
      <div className="forget-card">
        <h2>Forgot Password?</h2>
        <p>Enter your email and we'll send you instructions to reset your password</p>
        
        <form>
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Send Reset Link</button>
        </form>

        <div className="forget-footer">
          <Link to="/admin/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
