import React, { useState } from 'react';
import '../styles/Coupon.css';

const AddCoupon = () => {
  const [couponData, setCouponData] = useState({
    code: '',
    discountType: 'flat',
    discountValue: '',
    minOrderAmount: '',
    expiryDate: '',
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCouponData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save to localStorage instead of Firebase
      const existingCoupons = JSON.parse(localStorage.getItem('coupons') || '[]');
      const newCoupon = {
        ...couponData,
        id: Date.now().toString(),
        discountValue: Number(couponData.discountValue),
        minOrderAmount: Number(couponData.minOrderAmount),
        createdAt: new Date().toISOString()
      };
      
      existingCoupons.push(newCoupon);
      localStorage.setItem('coupons', JSON.stringify(existingCoupons));

      alert('Coupon added successfully!');
      setCouponData({
        code: '',
        discountType: 'flat',
        discountValue: '',
        minOrderAmount: '',
        expiryDate: '',
        isActive: true
      });
    } catch (error) {
      console.error("Error adding coupon:", error);
      alert('Failed to add coupon.');
    }
  };

  return (
    <div className="add-coupon-container">
      <h2>Add New Coupon</h2>
      <form className="add-coupon-form" onSubmit={handleSubmit}>
        <label>Coupon Code</label>
        <input
          type="text"
          name="code"
          value={couponData.code}
          onChange={handleChange}
          required
        />

        <label>Discount Type</label>
        <select
          name="discountType"
          value={couponData.discountType}
          onChange={handleChange}
        >
          <option value="flat">Flat</option>
          <option value="percentage">Percentage</option>
        </select>

        <label>Discount Value</label>
        <input
          type="number"
          name="discountValue"
          value={couponData.discountValue}
          onChange={handleChange}
          required
        />

        <label>Minimum Order Amount</label>
        <input
          type="number"
          name="minOrderAmount"
          value={couponData.minOrderAmount}
          onChange={handleChange}
        />

        <label>Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={couponData.expiryDate}
          onChange={handleChange}
        />

        <div className="checkbox-group">
          <input
            type="checkbox"
            name="isActive"
            checked={couponData.isActive}
            onChange={handleChange}
          />
          <label>Active</label>
        </div>

        <button type="submit">Add Coupon</button>
      </form>
    </div>
  );
};

export default AddCoupon;
