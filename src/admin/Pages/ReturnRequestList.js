import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdVisibility } from 'react-icons/md';
import '../styles/ReturnRequest.css';

const ReturnRequestList = () => {
  const navigate = useNavigate();

  const returnRequests = [
    {
      id: 'RET001',
      orderId: 'ORD001',
      customer: 'Raj Sharma',
      reason: 'Wrong product received',
      status: 'Pending',
      date: '2025-04-10',
    },
    {
      id: 'RET002',
      orderId: 'ORD002',
      customer: 'Riya',
      reason: 'Damaged item',
      status: 'Approved',
      date: '2025-04-11',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'orange';
      case 'Approved': return 'green';
      case 'Rejected': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="admin-card">
      <h2 className="page-title">Return Requests</h2>

      <table className="return-table">
        <thead>
          <tr>
            <th>Return ID</th>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {returnRequests.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.orderId}</td>
              <td>{r.customer}</td>
              <td>{r.reason}</td>
              <td>
                <span
                  className="return-status"
                  style={{
                    backgroundColor: getStatusColor(r.status),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                  }}
                >
                  {r.status}
                </span>
              </td>
              <td>{r.date}</td>
              <td>
                <button
                  className="view-btn"
                  onClick={() => navigate(`/admin/returns/${r.id}`)}
                >
                  <MdVisibility />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnRequestList;
