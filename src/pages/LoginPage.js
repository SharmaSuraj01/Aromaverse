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

const LoginPage = () => {
  const navigate = useNavigate();
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
      navigate('/checkout');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    const emailPrompt = window.prompt('Enter your email to reset your password:');
    if (!emailPrompt) return;

    try {
      await sendPasswordResetEmail(auth, emailPrompt);
      setMessage('Password reset email sent! Check your inbox.');
      setError('');
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
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
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
            onClick={handleForgotPassword}
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
    </AuthLayout>
  );
};

export default LoginPage;
