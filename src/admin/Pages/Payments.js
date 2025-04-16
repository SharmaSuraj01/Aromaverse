import React, { useState } from 'react';
import Papa from 'papaparse';
import '../styles/Payments.css';

const Payments = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Dummy data for transactions
  const transactions = [
    { id: 'T1001', date: '2025-04-10', amount: 5000, status: 'Successful', method: 'Credit Card' },
    { id: 'T1002', date: '2025-04-11', amount: 3000, status: 'Failed', method: 'Debit Card' },
    { id: 'T1003', date: '2025-04-12', amount: 4000, status: 'Pending', method: 'PayPal' },
  ];

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredTransactions = statusFilter === 'all' ? transactions : transactions.filter(t => t.status === statusFilter);

  const exportToCSV = () => {
    const csvData = filteredTransactions.map(t => ({
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
    downloadLink.download = 'transactions.csv';
    downloadLink.click();
  };
  

  const refundTransaction = (id) => {
    alert(`Refunding transaction: ${id}`);
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
            {filteredTransactions.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.date}</td>
                <td>₹{t.amount}</td>
                <td>{t.status}</td>
                <td>{t.method}</td>
                <td>
                  {t.status === 'Successful' && <button onClick={() => refundTransaction(t.id)}>Refund</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="actions">
        <button className="export-btn" onClick={exportToCSV}>Export to CSV</button>
      </div>

      <div className="gateway-status">
        <h3>Payment Gateway Status</h3>
        <p>Status: <strong>Active</strong></p>
      </div>
    </div>
  );
};

export default Payments;
