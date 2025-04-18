import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
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
      try {
        const docRef = doc(db, 'bundleOffers', offerId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBundleOffer(docSnap.data());
        } else {
          console.log('No such bundle offer!');
        }
      } catch (error) {
        console.error('Error fetching bundle offer:', error);
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'bundleOffers', offerId);
      await updateDoc(docRef, {
        ...bundleOffer,
        buyQuantity: Number(bundleOffer.buyQuantity),
        getQuantity: Number(bundleOffer.getQuantity),
        discount: Number(bundleOffer.discount),
      });

      console.log('Bundle offer updated!');
      navigate('/admin/bundleoffers');
    } catch (error) {
      console.error('Error updating bundle offer:', error);
    }
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
