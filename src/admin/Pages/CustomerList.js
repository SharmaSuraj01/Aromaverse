import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CustomerCommon.css';

const CustomerList = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Get orders from localStorage instead of Firestore
    const fetchOrders = () => {
      try {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        // Process orders to get customer data
        const map = {};

        orders.forEach((order) => {
          const { shipping, email, total } = order;
          const { name, address } = shipping || {};

          if (!email) return;

          if (!map[email]) {
            map[email] = {
              name: name || 'No Name Available',
              email,
              address: address || 'No Address Available',
              totalOrders: 1,
              totalSpent: total || 0,
            };
          } else {
            map[email].totalOrders += 1;
            map[email].totalSpent += total || 0;
          }
        });

        // Prepare customer data
        const result = Object.values(map).map((c) => ({
          ...c,
          segment:
            c.totalOrders >= 5
              ? 'VIP'
              : c.totalOrders >= 2
              ? 'Regular'
              : 'First Time',
        }));

        setCustomers(result);
      } catch (error) {
        console.error('Error fetching orders from localStorage:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="admin-card">
      <h2 className="page-title">Customers</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Total Spend</th>
            <th>Segment</th>
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No customer data.
              </td>
            </tr>
          ) : (
            customers.map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.totalOrders}</td>
                <td>₹{c.totalSpent}</td>
                <td>{c.segment}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() =>
                      navigate(`/admin/customers/${encodeURIComponent(c.email)}`)
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
