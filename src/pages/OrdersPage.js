import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../css/Shop.css';
import '../css/OrderStatus.css'; // for tracker styles

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const q = query(collection(db, 'orders'), where('userId', '==', currentUser.uid));
        const unsubscribeOrders = onSnapshot(q, (snapshot) => {
          const updatedOrders = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(updatedOrders);
          setLoading(false);
        });

        // Clean up Firestore listener
        return () => unsubscribeOrders();
      } else {
        setUser(null);
        setOrders([]);
        setLoading(false);
      }
    });

    // Clean up Auth listener
    return () => unsubscribeAuth();
  }, []);

  const statusSteps = ['Ordered', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">My Orders</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : !user ? (
        <p className="text-center">Please login to view your orders 🔒</p>
      ) : orders.length === 0 ? (
        <p className="text-center">No orders placed yet 🛍️</p>
      ) : (
        orders.map((order, index) => {
          const currentStep = statusSteps.indexOf(order.status);

          return (
            <div key={index} className="card shadow-sm p-3 mb-4">
              <h5>Order #{order.id}</h5>
              <p className="mb-1 text-muted">
                Date:{' '}
                {order.timestamp?.seconds
                  ? new Date(order.timestamp.seconds * 1000).toLocaleString()
                  : 'N/A'}
              </p>

              <div className="order-tracker my-3">
                {statusSteps.map((step, i) => (
                  <div key={i} className={`step ${i <= currentStep ? 'completed' : ''}`}>
                    <div className="step-circle">{i + 1}</div>
                    <div className="step-label">{step}</div>
                  </div>
                ))}
              </div>

              <div className="mb-2">
                <strong>Shipping Details:</strong>
                <br />
                {order.shipping?.name}
                <br />
                {order.shipping?.phone}
                <br />
                {order.shipping?.address}
              </div>

              <ul className="list-group list-group-flush mb-2">
                {order.items?.map((item, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between">
                    {item.name} × {item.qty}
                    <span>₹{item.qty * item.price}</span>
                  </li>
                ))}
              </ul>

              <div className="text-end fw-bold">
                Total: ₹
                {order.items?.reduce((acc, item) => acc + item.qty * item.price, 0)}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrdersPage;
