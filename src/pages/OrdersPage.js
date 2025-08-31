import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import '../css/Shop.css';
import '../css/OrderStatus.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Get orders from localStorage for this user
      const userOrders = JSON.parse(localStorage.getItem(`orders_${user.uid}`) || '[]');
      setOrders(userOrders);
    }
    setLoading(false);
  }, [user]);

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
                Date: {new Date(order.timestamp).toLocaleString()}
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
                Total: ₹{order.total || order.items?.reduce((acc, item) => acc + item.qty * item.price, 0)}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default OrdersPage;
