import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditCoupon = () => {
  const { couponId } = useParams();
  const navigate = useNavigate();

  const [couponData, setCouponData] = useState({
    code: "",
    discount: "",
    status: "active",
    expiry: "",
  });

  useEffect(() => {
    // Yahan API call hogi in real life. Abhi dummy se prefill kar raha hu.
    const fetchCoupon = async () => {
      const dummyCoupon = {
        id: couponId,
        code: "SAVE20",
        discount: "20",
        status: "active",
        expiry: "2025-05-31",
      };
      setCouponData(dummyCoupon);
    };

    fetchCoupon();
  }, [couponId]);

  const handleChange = (e) => {
    setCouponData({ ...couponData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send PUT request to update coupon
    console.log("Updated coupon data:", couponData);
    // Navigate to coupon list
    navigate("/admin/coupons");
  };

  return (
    <div className="add-coupon-container">
      <h2>Edit Coupon</h2>
      <form className="add-coupon-form" onSubmit={handleSubmit}>
        <label>Coupon Code</label>
        <input
          type="text"
          name="code"
          value={couponData.code}
          onChange={handleChange}
        />

        <label>Discount (%)</label>
        <input
          type="number"
          name="discount"
          value={couponData.discount}
          onChange={handleChange}
        />

        <label>Expiry Date</label>
        <input
          type="date"
          name="expiry"
          value={couponData.expiry}
          onChange={handleChange}
        />

        <label>Status</label>
        <select
          name="status"
          value={couponData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit">Update Coupon</button>
      </form>
    </div>
  );
};

export default EditCoupon;
