import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/CouponList.css';

const CouponList = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {

    console.log('Add Coupon Component Rendered');
    const dummyCoupons = [
      {
        id: 1,
        code: 'SAVE20',
        discountType: 'flat',
        discountValue: 20,
        minOrderAmount: 100,
        expiryDate: '2025-05-31',
        isActive: true,
      },
    ];
    setCoupons(dummyCoupons);
  }, []);

  const filteredCoupons = coupons.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (couponId) => {
    navigate(`/admin/coupons/edit/${couponId}`);
    //back
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  return (
    <div className="coupon-list-container">
      <h2>Coupon List</h2>
      <input
        type="text"
        placeholder="Search by code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <table className="coupon-table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Type</th>
            <th>Value</th>
            <th>Min Order</th>
            <th>Expiry</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCoupons.map(coupon => (
            <tr key={coupon.id}>
              <td>{coupon.code}</td>
              <td>{coupon.discountType}</td>
              <td>{coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}</td>
              <td>₹{coupon.minOrderAmount}</td>
              <td>{coupon.expiryDate}</td>
              <td>
                <span className={coupon.isActive ? 'active' : 'inactive'}>
                  {coupon.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(coupon.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(coupon.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CouponList;
