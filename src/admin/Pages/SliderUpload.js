import React, { useState } from 'react';
import '../styles/Sliderup.css';

const SliderUpload = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setSliderImages(files);
    setImagePreviews(previews);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = sliderImages.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setSliderImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sliderImages.length === 0) {
      alert('❗ Please upload at least one slider image');
      return;
    }

    // Save to localStorage
    const storedSliders = JSON.parse(localStorage.getItem('homepageSliders')) || [];
    const newSliders = [...storedSliders, ...sliderImages];
    localStorage.setItem('homepageSliders', JSON.stringify(newSliders));

    alert('✅ Slider images uploaded successfully!');
  };

  return (
    <div className="slider-upload-container">
      <h2>Upload Homepage Slider Images</h2>
      
      {/* Image Upload Section */}
      <div className="form-group">
        <label>Upload Slider Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </div>

      {/* Preview of uploaded images */}
      {imagePreviews.length > 0 && (
        <div className="image-preview-container">
          {imagePreviews.map((img, idx) => (
            <div key={idx} className="image-preview">
              <img src={img} alt={`slider-preview-${idx}`} />
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

      {/* Submit Button */}
      <button className="submit-btn" onClick={handleSubmit}>Upload Slider Images</button>
    </div>
  );
};

export default SliderUpload;
