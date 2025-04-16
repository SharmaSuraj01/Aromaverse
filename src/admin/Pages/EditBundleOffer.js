import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BundleOffer.css';

const EditBundleOffer = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const [bundleOffer, setBundleOffer] = useState({
    offerName: '',
    buyQuantity: '',
    getQuantity: '',
    discount: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchOffer = async () => {
      const dummyOffer = {
        id: offerId,
        offerName: 'Buy 2 Get 1 Free',
        buyQuantity: 2,
        getQuantity: 1,
        discount: 50,
        startDate: '2025-04-01',
        endDate: '2025-04-30',
      };
      setBundleOffer(dummyOffer);
    };

    fetchOffer();
  }, [offerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBundleOffer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Bundle Offer:', bundleOffer);
    navigate('/admin/bundleoffers');
  };

  return (
    <div className="edit-bundle-container bundle-container">
      <h2>Edit Bundle Offer</h2>
      <form className="edit-bundle-form" onSubmit={handleSubmit}>
        <label>Offer Name</label>
        <input
          type="text"
          name="offerName"
          value={bundleOffer.offerName}
          onChange={handleChange}
        />

        <label>Buy Quantity</label>
        <input
          type="number"
          name="buyQuantity"
          value={bundleOffer.buyQuantity}
          onChange={handleChange}
        />

        <label>Get Quantity</label>
        <input
          type="number"
          name="getQuantity"
          value={bundleOffer.getQuantity}
          onChange={handleChange}
        />

        <label>Discount (%)</label>
        <input
          type="number"
          name="discount"
          value={bundleOffer.discount}
          onChange={handleChange}
        />

        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={bundleOffer.startDate}
          onChange={handleChange}
        />

        <label>End Date</label>
        <input
          type="date"
          name="endDate"
          value={bundleOffer.endDate}
          onChange={handleChange}
        />

        <button type="submit">Update Offer</button>
      </form>
    </div>
  );
};

export default EditBundleOffer;
