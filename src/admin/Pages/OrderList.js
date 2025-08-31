import React, { useState, useEffect } from 'react';
import { MdVisibility, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import '../styles/OrderList.css';

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const orderList = savedOrders.map(data => ({
      id: data.id,
      name: data.shipping?.name || 'N/A',
      amount: data.total || 0,
      status: data.status || 'Ordered',
      dateFormatted: new Date(data.timestamp).toLocaleDateString()
    }));

    setOrders(orderList);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ordered': return 'gray';
      case 'Processing': return 'blue';
      case 'Shipped': return 'green';
      case 'Delivered': return 'purple';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  const handleView = (orderId) => {
    if (orderId) {
      navigate(`/admin/orders/${orderId}`);
    }
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = savedOrders.filter(order => order.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        setOrders(prev => prev.filter(order => order.id !== orderId));
        console.log('Order deleted');
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    if (!orderId || !newStatus) return;

    try {
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = savedOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="admin-card">
      <h2 className="page-title">Order List</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
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
                <td>{order.name}</td>
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
                <td>{order.dateFormatted}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => handleView(order.id)}
                    title="View Order"
                  >
                    <MdVisibility />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(order.id)}
                    title="Delete Order"
                  >
                    <MdDelete />
                  </button>
                  <select
                    value={order.status || 'Ordered'}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="status-dropdown"
                  >
                    <option value="Ordered">Ordered</option>
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
