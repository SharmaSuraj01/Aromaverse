import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from react-router-dom
import '../styles/Banners.css';

const Banners = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const storedBanners = JSON.parse(localStorage.getItem('banners')) || [];
    setBannerImages(storedBanners);
    setImagePreviews(storedBanners);
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const fileReaders = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders)
      .then((base64Images) => {
        setBannerImages((prevImages) => [...prevImages, ...base64Images]);
        setImagePreviews((prevPreviews) => [...prevPreviews, ...base64Images]);
      })
      .catch((error) => {
        console.error('Error processing the files:', error);
        alert('❗ Failed to process images.');
      });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = bannerImages.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setBannerImages(updatedImages);
    setImagePreviews(updatedPreviews);
    localStorage.setItem('banners', JSON.stringify(updatedImages));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bannerImages.length === 0) {
      alert('❗ Please upload at least one banner image');
      return;
    }

    // Save to localStorage
    localStorage.setItem('banners', JSON.stringify(bannerImages));
    alert('✅ Banners uploaded successfully!');

    navigate('/bannersdisplay'); 
  };

  return (
    <div className="banners-container">
      <h2>Manage Banners</h2>

      <div className="form-group">
        <label>Upload Banner Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>

      {imagePreviews.length > 0 && (
        <div className="image-preview-container">
          {imagePreviews.map((img, idx) => (
            <div key={idx} className="image-preview">
              <img src={img} alt={`banner-preview-${idx}`} />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => handleRemoveImage(idx)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button className="submit-btn" onClick={handleSubmit}>
        Upload Banners
      </button>
    </div>
  );
};

export default Banners;
