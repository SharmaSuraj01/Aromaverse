import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import '../styles/CouponList.css';

const CouponList = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'coupons'), (snapshot) => {
      const fetchedCoupons = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCoupons(fetchedCoupons);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  const filteredCoupons = coupons.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (couponId) => {
    navigate(`/admin/coupons/edit/${couponId}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        await deleteDoc(doc(db, 'coupons', id)); // Delete from Firestore
        // No need to update state manually — onSnapshot handles it!
      } catch (error) {
        console.error('Error deleting coupon:', error);
        alert('Failed to delete coupon.');
      }
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
