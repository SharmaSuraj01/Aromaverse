import React, { useState } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError("Passwords don't match");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user profile to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        phone: '',
        address: '',
        createdAt: new Date()
      });

      navigate('/checkout');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;

      const docRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(docRef);

      // Save profile if first time
      if (!userDoc.exists()) {
        await setDoc(docRef, {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email,
          phone: '',
          address: '',
          createdAt: new Date()
        });
      }

      navigate('/checkout');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleRegister}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark w-100 mb-3">Register</button>

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

export default RegisterPage;
