import React, { useState } from 'react';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import '../css/AuthPopup.css'; // Make sure this file exists

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [showResetPopup, setShowResetPopup] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/checkout');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setMessage('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) return;
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setMessage('Password reset email sent! Check your inbox.');
      setError('');
      setShowResetPopup(false);
      setResetEmail('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
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
            onClick={() => setShowResetPopup(true)}
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
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </button>
      </form>

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
