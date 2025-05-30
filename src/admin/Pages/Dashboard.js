import React, { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [timeFrame, setTimeFrame] = useState('daily');

  // Firestore data fetching
  useEffect(() => {
    const unsubscribeOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(fetchedOrders);
    });

    const unsubscribeProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const fetchedProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(fetchedProducts);
    });

    return () => {
      unsubscribeOrders();
      unsubscribeProducts();
    };
  }, []);

  // Revenue & buyers
  const totalRevenue = orders.reduce((acc, order) => acc + (order.total || 0), 0);
  const uniqueBuyers = new Set(orders.map(order => order.customer?.email)).size;
  const latestOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const topProducts = [...products]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 5);

  const lowStock = products.filter(p => (p.stock || 0) < 10);

  // Buyer behavior
  const repeatBuyers = orders.reduce((acc, order) => {
    const email = order.customer?.email;
    if (email) acc[email] = (acc[email] || 0) + 1;
    return acc;
  }, {});
  const returning = Object.values(repeatBuyers).filter(count => count > 1).length;
  const cartAbandonment = orders.filter(order => order.status === 'Abandoned').length;
  const frequentBuyers = orders.filter(order => repeatBuyers[order.customer?.email] > 2).length;

  // Placeholder for sales data by date (based on real orders)
  const salesData = orders.map(order => ({
    date: order.date,
    total: order.total || 0,
  }));

  const filterSalesData = () => {
    const currentDate = new Date();
    return salesData.filter((data) => {
      const dataDate = new Date(data.date);
      switch (timeFrame) {
        case 'weekly':
          return dataDate >= new Date(currentDate.setDate(currentDate.getDate() - 7));
        case 'monthly':
          return dataDate.getMonth() === new Date().getMonth();
        case 'yearly':
          return dataDate.getFullYear() === new Date().getFullYear();
        default:
          return dataDate.toDateString() === new Date().toDateString();
      }
    });
  };

  const marketingData = [
    { campaign: 'Instagram', reach: 10000, conversions: 200 },
    { campaign: 'Google Ads', reach: 15000, conversions: 350 },
  ];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-cards">
        <div className="card">Total Orders<br /><strong>{orders.length}</strong></div>
        <div className="card">Total Products<br /><strong>{products.length}</strong></div>
        <div className="card">Total Buyers<br /><strong>{uniqueBuyers}</strong></div>
        <div className="card">Total Revenue<br /><strong>₹{totalRevenue}</strong></div>
      </div>

      <div className="dashboard-charts">
        <div className="chart-box">[ Orders Chart ]</div>
        <div className="chart-box">[ Revenue Chart ]</div>
      </div>

      <div className="latest-orders">
        <h3>Latest Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.length > 0 ? latestOrders.map((o, idx) => (
              <tr key={idx}>
                <td>{o.id}</td>
                <td>{o.customer?.name || 'N/A'}</td>
                <td>₹{o.total}</td>
                <td>{o.status || 'Placed'}</td>
                <td>{o.date}</td>
              </tr>
            )) : (
              <tr><td colSpan="5" style={{ textAlign: 'center' }}>No recent orders</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="reports-section">
        <h3>Reports & Analytics</h3>

        <div className="report-filters">
          <label>Select Time Frame:</label>
          <select onChange={e => setTimeFrame(e.target.value)} value={timeFrame}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="card-group">
          <div className="card">Returning Customers<br /><strong>{returning}</strong></div>
          <div className="card">Low Stock Items<br /><strong>{lowStock.length}</strong></div>
          <div className="card">Frequent Buyers<br /><strong>{frequentBuyers}</strong></div>
          <div className="card">Cart Abandonments<br /><strong>{cartAbandonment}</strong></div>
        </div>

        <h4>Top-Selling Perfumes</h4>
        <ul>
          {topProducts.map((p, i) => (
            <li key={i}>{p.name} - Sold: {p.sold || 0}</li>
          ))}
        </ul>

        <h4>Sales Reports ({timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)})</h4>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            {filterSalesData().map((s, i) => (
              <tr key={i}>
                <td>{s.date}</td>
                <td>₹{s.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4>Marketing Campaigns</h4>
        <table className="marketing-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Reach</th>
              <th>Conversions</th>
            </tr>
          </thead>
          <tbody>
            {marketingData.map((c, i) => (
              <tr key={i}>
                <td>{c.campaign}</td>
                <td>{c.reach}</td>
                <td>{c.conversions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
