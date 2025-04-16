// OrderList.js
import React, { useState, useEffect } from 'react';
import { MdVisibility, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // adjust path as necessary
import '../styles/OrderList.css';

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const orderList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(orderList);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed': return 'gray';
      case 'Processing': return 'blue';
      case 'Shipped': return 'green';
      case 'Delivered': return 'purple';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  const handleView = (orderId) => {
    navigate(`/admin/orders/${orderId}`);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status: newStatus });
  };

  return (
    <div className="admin-card">
      <h2 className="page-title">Order List</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer || 'N/A'}</td>
                <td>{order.amount}</td>
                <td>
                  <span
                    className="order-status"
                    style={{
                      backgroundColor: getStatusColor(order.status),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                    }}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.date || 'N/A'}</td>
                <td>
                  <button className="view-btn" onClick={() => handleView(order.id)}>
                    <MdVisibility />
                  </button>
                  <button className="delete-btn" disabled>
                    <MdDelete />
                  </button>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
