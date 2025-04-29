import React, { useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const RegisterPage = () => {
  const navigate = useNavigate();

  // State variables
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Handle form submission for registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError("Passwords don't match");

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, {
        displayName: name,
      });

      // Set user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        phone,
        address: '',
        createdAt: new Date(),
      });

      // Navigate to the homepage
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };
  
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'This email is already registered.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  };
  

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;

      // Check if the user exists in Firestore
      const docRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(docRef);

      // If user doesn't exist, create a new record
      if (!userDoc.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email,
          phone: '',
          address: '',
          createdAt: new Date(),
        });
      }

      // Navigate to the checkout page after login
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleRegister}>
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Name Input */}
        <div className="mb-3">
          <label>
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Phone Number Input */}
        <div className="mb-3">
          <label>
            Phone Number <span className="text-danger">*</span>
          </label>
          <input
            type="tel"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <label>
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="mb-3">
          <label>
            Password <span className="text-danger">*</span>
          </label>
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

        {/* Confirm Password Input */}
        <div className="mb-3">
          <label>
            Confirm Password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        {/* Submit Register Button */}
        <button type="submit" className="btn btn-dark w-100 mb-3">
          Register
        </button>

        {/* Divider */}
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
    </AuthLayout>
  );
};

export default RegisterPage;
