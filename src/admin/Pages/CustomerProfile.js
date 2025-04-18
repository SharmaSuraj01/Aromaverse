import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'; // Import Firestore database
import { collection, getDocs } from 'firebase/firestore';
import '../styles/CustomerProfile.css';

const CustomerProfile = () => {
  const { email } = useParams(); // Get email from URL parameters
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const ordersSnapshot = await getDocs(collection(db, 'orders'));
        const orders = ordersSnapshot.docs.map(doc => doc.data());

        // Find the customer with the provided email
        const customerData = orders.find(order => order.email === email);

        if (customerData) {
          // Extract customer details from the shipping field
          const { shipping, email, total, segment } = customerData;
          const { name, address } = shipping;

          setCustomer({
            name: name || 'No Name Available',
            email,
            address: address || 'No Address Available',
            totalOrders: 1, // Assuming 1 order for profile page, can be updated
            totalSpent: total || 0,
            segment,
          });
        } else {
          console.log("Customer not found");
        }
      } catch (error) {
        console.error('Error fetching customer profile:', error);
      }
    };

    fetchCustomer();
  }, [email]);

  return (
    <div className="profile-container">
      {customer ? (
        <div className="profile-card">
          <h2>{customer.name}'s Profile</h2>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>Total Orders:</strong> {customer.totalOrders}</p>
          <p><strong>Total Spend:</strong> ₹{customer.totalSpent}</p>
          <p><strong>Segment:</strong> {customer.segment}</p>
        </div>
      ) : (
        <p>Loading customer profile...</p>
      )}
    </div>
  );
};

export default CustomerProfile;
