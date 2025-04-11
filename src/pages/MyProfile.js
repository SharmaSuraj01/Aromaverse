import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const MyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async (user) => {
      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProfile({ ...snap.data() });
        }
      } catch (err) {
        console.error('Error loading profile:', err.message);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) fetchProfile(user);
      else setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!profile) return;
    setUpdating(true);
    try {
      const ref = doc(db, 'users', profile.uid);
      await updateDoc(ref, {
        name: profile.name,
        phone: profile.phone,
        address: profile.address,
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error('Update error:', err.message);
      setMessage('Failed to update profile.');
    }
    setUpdating(false);
  };

  if (loading) return <div className="container py-5 text-center">Loading...</div>;

  if (!profile) return <div className="container py-5 text-center">User not logged in.</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Profile</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="mb-3">
        <label>Name</label>
        <input
          className="form-control"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          className="form-control"
          value={profile.email}
          disabled
        />
      </div>

      <div className="mb-3">
        <label>Phone</label>
        <input
          className="form-control"
          name="phone"
          value={profile.phone || ''}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Address</label>
        <textarea
          className="form-control"
          name="address"
          value={profile.address || ''}
          onChange={handleChange}
        />
      </div>

      <button
        className="btn btn-dark"
        onClick={handleUpdate}
        disabled={updating}
      >
        {updating ? 'Saving...' : 'Update Profile'}
      </button>
    </div>
  );
};

export default MyProfile;
