import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Import Firestore database
import { collection, getDocs } from 'firebase/firestore';
import '../styles/CustomerCommon.css';

const CustomerList = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch orders from Firestore
    const fetchOrders = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const orders = ordersSnapshot.docs.map(doc => doc.data());

        // Process orders to get customer data
        const map = {};

        orders.forEach((order) => {
          // Extract customer data from shipping field
          const { shipping, email, total } = order;
          const { name, address } = shipping; // Extracting name and address from shipping

          // Ensure email exists for unique customer identification
          if (!email) return;

          // Check if this customer already exists in the map
          if (!map[email]) {
            map[email] = {
              name: name || 'No Name Available',  // If no name, fallback to 'No Name Available'
              email,
              address: address || 'No Address Available',  // Fallback for address
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
        console.error('Error fetching orders from Firestore:', error);
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
                <td>{c.name}</td> {/* Name will now be displayed correctly */}
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
