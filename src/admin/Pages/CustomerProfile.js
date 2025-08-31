import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CustomerProfile.css';

const CustomerProfile = () => {
  const { email } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomer = () => {
      try {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        
        // Find the customer with the provided email
        const customerData = orders.find(order => order.email === email);

        if (customerData) {
          const { shipping, email, total } = customerData;
          const { name, address } = shipping || {};

          setCustomer({
            name: name || 'No Name Available',
            email,
            address: address || 'No Address Available',
            totalOrders: orders.filter(o => o.email === email).length,
            totalSpent: orders.filter(o => o.email === email).reduce((sum, o) => sum + (o.total || 0), 0),
            segment: 'Regular', // Can be calculated based on orders
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
