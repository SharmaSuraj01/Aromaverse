import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/OrderDetails.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { db } from '../../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { updateInventory } from '../Pages/Inventory'; // Make sure this function works with Firestore

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  // Fetch order data in real-time from Firestore
  useEffect(() => {
    const orderRef = doc(db, 'orders', orderId);
    const unsubscribe = onSnapshot(orderRef, (docSnap) => {
      if (docSnap.exists()) {
        const orderData = docSnap.data();
        setOrder({ id: docSnap.id, ...orderData });
        setStatus(orderData.status);
      } else {
        console.warn('Order not found');
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, [orderId]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
      alert(`Order status updated to "${newStatus}"`);

      if (newStatus === 'Delivered') {
        updateInventory(order.items, 'subtract'); // Ensure this updates Firestore inventory
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleInvoiceDownload = () => {
    const docPDF = new jsPDF();

    docPDF.setFontSize(18);
    docPDF.text(`Invoice - Order #${order.id}`, 14, 20);

    docPDF.setFontSize(12);
    docPDF.text(`Date: ${order.date}`, 14, 30);
    docPDF.text(`Customer: ${order.customer.name}`, 14, 38);
    docPDF.text(`Email: ${order.customer.email}`, 14, 46);
    docPDF.text(`Phone: ${order.customer.phone}`, 14, 54);
    docPDF.text(`Address: ${order.customer.address}`, 14, 62);

    autoTable(docPDF, {
      startY: 72,
      head: [['Product', 'Qty', 'Price (₹)', 'Total']],
      body: order.items.map((item) => [
        item.name,
        item.qty,
        item.price,
        item.qty * item.price,
      ]),
    });

    docPDF.setFontSize(14);
    docPDF.text(`Total Amount: ₹${order.total}`, 14, docPDF.lastAutoTable.finalY + 10);

    docPDF.save(`Invoice-${order.id}.pdf`);
  };

  if (!order) {
    return <div className="order-details-container"><p>Loading order details...</p></div>;
  }

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
