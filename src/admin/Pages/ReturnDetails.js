import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/OrderDetails.css';

const ReturnDetails = () => {
  const { id } = useParams();

  const returnRequest = {
    id: id,
    customer: {
      name: 'Riya Verma',
      email: 'riya@example.com',
      reason: 'Product was defective',
      date: '2025-04-12',
    },
    items: [
      { name: 'Z Seduces Perfume', qty: 1, price: 1499 }
    ],
    status: 'Pending'
  };

  const handleApprove = () => {
    alert(`Return Approved for #${returnRequest.id}`);
  };

  const handleReject = () => {
    alert(`Return Rejected for #${returnRequest.id}`);
  };

  return (
    <div className="order-details-container">
      <h2>Return Request #{returnRequest.id}</h2>
      <p><strong>Date:</strong> {returnRequest.customer.date}</p>

      <div className="order-section">
        <h3>Customer Info</h3>
        <p><strong>Name:</strong> {returnRequest.customer.name}</p>
        <p><strong>Email:</strong> {returnRequest.customer.email}</p>
        <p><strong>Reason:</strong> {returnRequest.customer.reason}</p>
      </div>

      <div className="order-section">
        <h3>Returned Items</h3>
        <table className="order-items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {returnRequest.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button className="approve-btn" onClick={handleApprove}>Approve</button>
        <button className="reject-btn" onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
};

export default ReturnDetails;
