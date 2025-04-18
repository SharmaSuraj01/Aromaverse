import React, { useState, useEffect } from 'react';
import { MdVisibility, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
  doc,
  updateDoc,
  collection,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { db as firestoreDb } from '../../firebase'; // Adjust path as necessary
import '../styles/OrderList.css';

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestoreDb, 'orders'), (snapshot) => {
      const orderList = snapshot.docs.map((doc) => {
        const data = doc.data();

        const customerName =
          data.name || data.shipping?.name || data.user?.name || 'N/A';

        const amount = data.total || 0;
        const status = data.status || 'N/A';

        const dateFormatted = data.date?.seconds
          ? new Date(data.date.seconds * 1000).toLocaleString('en-IN', {
              timeZone: 'Asia/Kolkata',
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })
          : 'N/A';

        return {
          id: doc.id,
          name: customerName,
          amount,
          status,
          dateFormatted,
        };
      });

      setOrders(orderList);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed':
        return 'gray';
      case 'Processing':
        return 'blue';
      case 'Shipped':
        return 'green';
      case 'Delivered':
        return 'purple';
      case 'Cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  const handleView = (orderId) => {
    if (orderId) {
      navigate(`/admin/orders/${orderId}`);
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteDoc(doc(firestoreDb, 'orders', orderId));
        console.log('Order deleted');
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (!orderId || !newStatus) return;

    try {
      const orderRef = doc(firestoreDb, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
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
                    value={order.status || 'Placed'}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
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
