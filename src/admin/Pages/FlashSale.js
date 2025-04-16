import React, { useState, useEffect } from 'react';
import '../styles/FlashSale.css';

const FlashSale = () => {
  const [product, setProduct] = useState('');
  const [discount, setDiscount] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (endTime) {
      const interval = setInterval(() => {
        const end = new Date(endTime).getTime();
        const now = new Date().getTime();
        const diff = end - now;

        if (diff <= 0) {
          setTimeLeft("Flash Sale Ended");
          clearInterval(interval);
        } else {
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [endTime]);

  const handleSave = (e) => {
    e.preventDefault();

    if (!product || !discount || !startTime || !endTime) {
      setError('All fields must be filled.');
      return;
    }
    if (new Date(endTime) <= new Date(startTime)) {
      setError('End time must be later than start time.');
      return;
    }

    setError('');
    alert('Flash Sale Details Saved!');
  };

  return (
    <div className="flashsale-container">
      <h2>Manage Flash Sale</h2>
      <form className="flashsale-form" onSubmit={handleSave}>
        <div>
          <label>Select Product</label>
          <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} />
        </div>
        <div>
          <label>Discount (%)</label>
          <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>
        <div>
          <label>Start Time</label>
          <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div>
          <label>End Time</label>
          <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <button type="submit">Save Flash Sale</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {timeLeft && (
        <div className="flashsale-timer">
          <h3>Flash Sale Timer: {timeLeft}</h3>
        </div>
      )}
    </div>
  );
};

export default FlashSale;
