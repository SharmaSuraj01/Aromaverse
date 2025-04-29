import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import '../css/AuthPopup.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Redirect after successful login
    } catch (err) {
      setError(err.message); // Display error message if login fails
    }
  };

  // Login with Google
  const handleGoogleLogin = async () => {
    setError('');
    setMessage('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/'); // Redirect after successful Google login
    } catch (err) {
      setError(err.message); // Display error message if Google login fails
    }
  };

  // Send password reset email
  const handleResetPassword = async () => {
    if (!resetEmail) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setMessage('');
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setMessage('Password reset email sent! Check your inbox.');
      setShowResetPopup(false); // Close the reset password popup
      setResetEmail(''); // Clear email input after sending reset request
    } catch (err) {
      setError(err.message); // Display error message if reset fails
      setMessage('');
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleLogin}>
        {/* Error and Success Message */}
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        {/* Email Input */}
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

        {/* Password Input */}
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

        {/* Forgot Password Link */}
        <div className="mb-3 text-end">
          <small
            className="text-primary"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowResetPopup(true)}
          >
            Forgot your password?
          </small>
        </div>

        {/* Login Button */}
        <button type="submit" className="btn btn-dark w-100 mb-3">
          Login
        </button>

        {/* OR Divider */}
        <div className="text-center text-muted mb-2">OR</div>

        {/* Google Login Button */}
        <button
          type="button"
          className="btn btn-outline-danger w-100"
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>
      </form>

      {/* Password Reset Popup */}
      {showResetPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h5 className="mb-3">Reset Password</h5>
            <label className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control mb-3"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowResetPopup(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleResetPassword}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default LoginPage;