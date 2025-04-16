import React, { useState } from 'react';
import { MdVisibility, MdDelete } from 'react-icons/md';
import '../styles/OrderList.css';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const navigate = useNavigate();

  const [orderData, setOrderData] = useState([
    {
      id: 'ORD001',
      customer: 'Raj Sharma',
      amount: 1499,
      status: 'Placed',
      date: '2025-04-10',
    },
    {
      id: 'ORD002',
      customer: 'Riya',
      amount: 1599,
      status: 'Shipped',
      date: '2025-04-11',
    },
  ]);

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

  const handleStatusChange = (orderId, newStatus) => {
    const updatedOrders = orderData.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrderData(updatedOrders);
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
          {orderData.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
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
              <td>{order.date}</td>
              <td>
                <button className="view-btn" onClick={() => handleView(order.id)}>
                  <MdVisibility />
                </button>
                <button className="delete-btn">
                  <MdDelete />
                </button>
                <button onClick={() => navigate(`/admin/returns/${order.id}`)}>
                  <MdVisibility />
                </button>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="status-dropdown"
                >
                  <option value="Placed">Placed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
