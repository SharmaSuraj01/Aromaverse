import React, { useEffect, useState } from 'react';
import '../styles/SupportList.css';
import { MdVisibility } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const SupportList = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('supportTickets')) || [];
    setTickets(data);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return '#f97316';
      case 'Resolved':
        return '#10b981';
      case 'Closed':
        return '#64748b';
      default:
        return '#94a3b8';
    }
  };

  return (
    <div className="admin-card">
      <h2 className="page-title">Support Tickets</h2>

      <table className="support-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Customer</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No support tickets.</td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.name}</td>
                <td>{ticket.subject}</td>
                <td>
                  <span
                    className="ticket-status"
                    style={{
                      backgroundColor: getStatusColor(ticket.status),
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                    }}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td>{ticket.date}</td>
                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/admin/support/${ticket.id}`)}
                  >
                    <MdVisibility />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupportList;
