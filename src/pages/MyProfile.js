import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return { isMobile };
};

const MyProfile = () => {
  const { isMobile } = useDeviceDetect();
  const { user, updateProfile, loading } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    photoURL: ''
  });
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || user.displayName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        photoURL: user.photoURL || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create a preview URL
      const previewURL = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, photoURL: previewURL }));
    }
  };

  const handleUpdate = async () => {
    if (!user) return;
    setUpdating(true);
    
    try {
      await updateProfile(profile);
      setMessage('✅ Profile updated successfully!');
      setImageFile(null);
    } catch (err) {
      console.error('Update error:', err);
      setMessage('❌ Failed to update profile.');
    }
    setUpdating(false);
  };

  const renderForm = () => (
    <>
      <div className="mb-3 text-center">
        <img
          src={profile.photoURL || 'https://via.placeholder.com/120'}
          alt="Profile"
          className="rounded-circle"
          width="120"
          height="120"
          style={{ objectFit: 'cover' }}
        />
        <div className="mt-2">
          <input
            type="file"
            className="form-control form-control-sm mx-auto"
            style={{ maxWidth: '250px' }}
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Your Name"
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input className="form-control" value={profile.email} disabled />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Phone</label>
        <input
          className="form-control"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Your Phone"
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Address</label>
        <textarea
          className="form-control"
          name="address"
          value={profile.address}
          onChange={handleChange}
          rows={3}
          placeholder="Your Address"
        />
      </div>
      
      <div className="text-center">
        <button
          className="btn btn-dark w-100"
          onClick={handleUpdate}
          disabled={updating}
        >
          {updating ? 'Saving...' : 'Update Profile'}
        </button>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-3">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <p>User not logged in.</p>
      </div>
    );
  }

  return (
    <div
      className={`container py-4 ${
        isMobile ? 'px-3' : 'px-5'
      }`}
      style={{ maxWidth: isMobile ? '100%' : '600px' }}
    >
      <h2 className="mb-4 text-center">My Profile</h2>
      {message && <div className="alert alert-info text-center">{message}</div>}
      {renderForm()}
    </div>
  );
};

export default MyProfile;
