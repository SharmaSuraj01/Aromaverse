import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/OrderDetails.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { updateInventory } from '../Pages/Inventory';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(o => o.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
      setStatus(foundOrder.status);
    } else {
      console.warn('Order not found');
    }
  }, [orderId]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);

    try {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = orders.map(o => 
        o.id === orderId ? { ...o, status: newStatus } : o
      );
      
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrder(prev => ({ ...prev, status: newStatus }));
      
      alert(`Order status updated to "${newStatus}"`);

      if (newStatus === 'Delivered') {
        updateInventory(order.items, 'subtract');
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
    docPDF.text(`Date: ${new Date(order.timestamp).toLocaleDateString()}`, 14, 30);
    docPDF.text(`Customer: ${order.shipping?.name || 'N/A'}`, 14, 38);
    docPDF.text(`Email: ${order.email}`, 14, 46);
    docPDF.text(`Phone: ${order.shipping?.phone || 'N/A'}`, 14, 54);
    docPDF.text(`Address: ${order.shipping?.address || 'N/A'}`, 14, 62);

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
      <p><strong>Date:</strong> {new Date(order.timestamp).toLocaleDateString()}</p>

      <div className="order-section">
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {order.shipping?.name || 'N/A'}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Phone:</strong> {order.shipping?.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {order.shipping?.address || 'N/A'}</p>
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
          <option value="Ordered">Ordered</option>
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
