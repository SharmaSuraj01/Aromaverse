import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/SupportList.css'; 

const SupportDetails = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem('supportTickets')) || [];
    const found = tickets.find((t) => t.id === id);
    setTicket(found);
  }, [id]);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setTicket({ ...ticket, status: newStatus });

    const updated = JSON.parse(localStorage.getItem('supportTickets')).map((t) =>
      t.id === ticket.id ? { ...t, status: newStatus } : t
    );

    localStorage.setItem('supportTickets', JSON.stringify(updated));
    alert(`Status updated to ${newStatus}`);
  };

  if (!ticket) return <p style={{ padding: '2rem' }}>Ticket not found.</p>;

  return (
    <div className="admin-card">
      <h2 className="page-title">Ticket #{ticket.id}</h2>
      <p><strong>Customer:</strong> {ticket.name}</p>
      <p><strong>Email:</strong> {ticket.email}</p>
      <p><strong>Date:</strong> {ticket.date}</p>
      <p><strong>Subject:</strong> {ticket.subject}</p>
      <p><strong>Message:</strong></p>
      <p style={{ margin: '0.5rem 0 1.5rem' }}>{ticket.message}</p>

      <div>
      <div className="support-reply-section"><h3>Reply</h3><textarea className="reply-textarea" placeholder="Type your reply here..." rows="4"
      />
      <button className="reply-btn" onClick={() => alert("Reply sent (frontend only)")}>Send Reply
      </button>
      </div>
        <label style={{ fontWeight: 500, marginRight: '8px' }}>Change Status:</label>
        <select value={ticket.status} onChange={handleStatusChange}>
          <option value="Open">Open</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </div>
  );
};

export default SupportDetails;
