import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // adjust path as needed
import Papa from 'papaparse';
import '../styles/Payments.css';

const Payments = () => {
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));

        const fetchedData = querySnapshot.docs.map(doc => {
          const data = doc.data();

          const timestamp = data.timestamp?.seconds
            ? new Date(data.timestamp.seconds * 1000).toLocaleString('en-IN', {
                timeZone: 'Asia/Kolkata',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
              })
            : 'N/A';

          return {
            id: doc.id,
            date: timestamp,
            amount: data.total || 0,
            status: data.status || 'Unknown',
            method: data.paymentMethod || 'Unknown',
          };
        });

        setTransactions(fetchedData);
      } catch (error) {
        console.error('Error fetching payments from orders:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredTransactions =
    statusFilter === 'all'
      ? transactions
      : transactions.filter((t) => t.status === statusFilter);

  const exportToCSV = () => {
    const csvData = filteredTransactions.map((t) => ({
      'Transaction ID': t.id,
      'Date': t.date,
      'Amount': t.amount,
      'Status': t.status,
      'Payment Method': t.method,
    }));

    const csvContent = Papa.unparse(csvData);
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    downloadLink.target = '_blank';
    downloadLink.download = 'payments.csv';
    downloadLink.click();
  };

  const refundTransaction = (id) => {
    alert(`Refund requested for transaction: ${id}`);
  };

  return (
    <div className="payments-container">
      <h2 className="section-title">Payments & Transactions</h2>

      <div className="filter-section">
        <label>Filter by Payment Status: </label>
        <select onChange={handleStatusChange} value={statusFilter}>
          <option value="all">All</option>
          <option value="Successful">Successful</option>
          <option value="Failed">Failed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.status}</td>
                <td>{t.method}</td>
                <td>
                  {t.status === 'Successful' && (
                    <button onClick={() => refundTransaction(t.id)}>Refund</button>
                  )}
                </td>
              </tr>
            ))}
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="actions">
        <button className="export-btn" onClick={exportToCSV}>
          Export to CSV
        </button>
      </div>

      <div className="gateway-status">
        <h3>Payment Gateway Status</h3>
        <p>Status: <strong>Active</strong></p>
      </div>
    </div>
  );
};

export default Payments;
