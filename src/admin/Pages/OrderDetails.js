import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/OrderDetails.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { updateInventory } from '../Pages/Inventory';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [status, setStatus] = useState('Processing');

  const order = {
    id: orderId,
    date: '2024-04-12',
    customer: {
      name: 'Raj Sharma',
      email: 'raj@gmail.com',
      phone: '9876543210',
      address: 'Delhi, India',
    },
    items: [
      { name: 'Z Seduces Perfume', qty: 1, price: 1499 },
    ],
    total: 1499,
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    alert(`Order status updated to "${newStatus}"`);

    if (newStatus === 'Delivered') {
      updateInventory(order.items, 'subtract');
    }
  };

  const handleInvoiceDownload = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Invoice - Order #${order.id}`, 14, 20);

    doc.setFontSize(12);
    doc.text(`Date: ${order.date}`, 14, 30);
    doc.text(`Customer: ${order.customer.name}`, 14, 38);
    doc.text(`Email: ${order.customer.email}`, 14, 46);
    doc.text(`Phone: ${order.customer.phone}`, 14, 54);
    doc.text(`Address: ${order.customer.address}`, 14, 62);

    autoTable(doc, {
      startY: 72,
      head: [['Product', 'Qty', 'Price (₹)', 'Total']],
      body: order.items.map((item) => [
        item.name,
        item.qty,
        item.price,
        item.qty * item.price,
      ]),
    });

    doc.setFontSize(14);
    doc.text(`Total Amount: ₹${order.total}`, 14, doc.lastAutoTable.finalY + 10);

    doc.save(`Invoice-${order.id}.pdf`);
  };

  return (
    <div className="order-details-container">
      <h2>Order #{order.id}</h2>
      <p><strong>Date:</strong> {order.date}</p>

      <div className="order-section">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {order.customer.name}</p>
        <p><strong>Email:</strong> {order.customer.email}</p>
        <p><strong>Phone:</strong> {order.customer.phone}</p>
        <p><strong>Address:</strong> {order.customer.address}</p>
      </div>

      <div className="order-section">
        <h3>Order Items</h3>
        <table className="order-items-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price (₹)</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
                <td>{item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="order-total"><strong>Total: ₹{order.total}</strong></p>
      </div>

      <div className="order-section">
        <h3>Status</h3>
        <select value={status} onChange={handleStatusChange}>
          <option value="Placed">Placed</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button className="invoice-btn" onClick={handleInvoiceDownload}>
        Generate Invoice
      </button>
    </div>
  );
};

export default OrderDetails;
