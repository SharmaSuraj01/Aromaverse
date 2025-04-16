import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'; // Import Firestore database
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import '../styles/CustomerCommon.css';
import '../styles/CustomerProfile.css';

const CustomerProfile = () => {
  const { id } = useParams();  // Getting customer email from URL
  const [orders, setOrders] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      const email = decodeURIComponent(id);  // Decode the customer email from URL
      try {
        // Fetch orders related to the customer from Firestore
        const ordersQuery = query(
          collection(db, 'orders'),
          where('customer.email', '==', email)
        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const customerOrders = ordersSnapshot.docs.map(doc => doc.data());

        if (customerOrders.length > 0) {
          const customer = customerOrders[0].customer;
          const totalSpent = customerOrders.reduce((sum, o) => sum + o.total, 0);

          setProfile({ ...customer, totalSpent });
          setOrders(customerOrders);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [id]);

  if (!profile) return <p style={{ padding: '2rem' }}>Customer not found.</p>;

  const segment = profile.totalSpent > 5000 ? 'VIP' : 'Regular';

  return (
    <div className="admin-card">
      <h2 className="page-title">{profile.name}'s Profile</h2>

      <img
        src="https://i.pravatar.cc/60"
        alt="avatar"
        className="customer-avatar"
      />

      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Total Spent:</strong> ₹{profile.totalSpent}</p>
      <p><strong>Segment:</strong> <span className="segment-badge">{segment}</span></p>

      <h3 style={{ marginTop: '2rem' }}>Purchase History</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o, i) => (
            <tr key={i}>
              <td>{o.id}</td>
              <td>{o.date}</td>
              <td>₹{o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '2rem' }}>Saved Preferences</h3>
      <ul>
        <li>Category: For him</li>
        <li>Preferred Communication: Email</li>
      </ul>

      <h3 style={{ marginTop: '2rem' }}>Communication Logs</h3>
      <ul>
        <li>Email sent on 2025-04-10: "Order Confirmation"</li>
        <li>Inquiry on 2025-04-14: "Delay in shipping"</li>
      </ul>
    </div>
  );
};

export default CustomerProfile;
