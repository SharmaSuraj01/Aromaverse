import React, { useState } from 'react';
import '../css/Support.css'; // Optional: add styling here
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedIssue || !subject || !description) {
      alert('Please fill in all fields.');
      return;
    }

    // Simulate sending data (you'd usually POST to your backend here)
    console.log('Ticket Raised:', { selectedIssue, subject, description });

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setSelectedIssue('');
      setSubject('');
      setDescription('');
      navigate('/'); // Redirect to homepage or support history
    }, 3000);
  };

  return (
    <div className="container py-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4 text-center">Raise a Support Ticket</h3>

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
        <div className="mb-3">
          <label htmlFor="issueType" className="form-label">Select an Issue</label>
          <select
            id="issueType"
            className="form-select"
            value={selectedIssue}
            onChange={(e) => setSelectedIssue(e.target.value)}
          >
            <option value="">-- Choose an option --</option>
            <option value="order_not_received">Order not received</option>
            <option value="damaged_product">Damaged product</option>
            <option value="refund_issue">Refund issue</option>
            <option value="return_exchange">Return/Exchange</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input
            type="text"
            id="subject"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Didn't receive my order"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please explain your issue in detail..."
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">Submit Ticket</button>
      </form>

      {submitted && (
        <div className="alert alert-success mt-4 text-center" role="alert">
          🎉 Your ticket has been submitted! Our team will contact you shortly.
        </div>
      )}
    </div>
  );
};

export default Support;
