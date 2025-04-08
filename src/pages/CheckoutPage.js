import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';


const CheckoutPage = () => {
  const location = useLocation();
const cartItems = location.state?.cartItems || [];
const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
const tax = Math.round(subtotal * 0.15); // For example, 15% tax
const total = subtotal + tax;

  const handlePayment = () => {
    alert('Redirecting to Razorpay...');
    // Razorpay redirect code goes here
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Left: Contact & Shipping */}
        <div className="col-md-7">
          <h2 className="mb-4">Checkout</h2>

          <form className="needs-validation">
            <h5>Contact Information</h5>
            <div className="mb-3">
              <input type="email" className="form-control" placeholder="Email" required />
            </div>

            <h5 className="mt-4">Shipping Address</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="First name" required />
              </div>
              <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="Last name" required />
              </div>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Address" required />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Apartment, suite, etc. (optional)" />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input type="text" className="form-control" placeholder="City" required />
              </div>
              <div className="col-md-4 mb-3">
                <select className="form-select" required>
                  <option value="">Uttar Pradesh</option>
                  <option>Delhi</option>
                  <option>Maharashtra</option>
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <input type="text" className="form-control" placeholder="PIN" required />
              </div>
            </div>
            <div className="mb-3">
              <input type="tel" className="form-control" placeholder="Phone number for order updates" required />
            </div>

            <hr className="my-4" />

            <h5>Payment</h5>
            <div className="p-3 border rounded mb-3 bg-light">
              <p className="mb-2">Razorpay Secure (UPI, Cards, Wallets, NetBanking)</p>
              <small className="text-muted">
                After clicking “Pay now”, you will be redirected to Razorpay to complete your purchase securely.
              </small>
            </div>

            <button type="button" className="btn btn-dark w-100 py-2" onClick={handlePayment}>
              Pay Now
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="col-md-5">
          <div className="bg-light p-4 rounded shadow-sm">
            <h5 className="mb-4">Order Summary</h5>
            {cartItems.map((item) => (
  <div key={item.id} className="d-flex mb-3">
    <img src={item.img} alt={item.name} className="img-thumbnail me-3" style={{ width: '80px' }} />
    <div>
      <p className="mb-1 fw-semibold">{item.name}</p>
      <small className="text-muted">Qty: {item.qty}</small>
      <p className="fw-bold mt-2">₹{item.price * item.qty}</p>
    </div>
  </div>
))}


            <hr />
            <hr />
<div className="d-flex justify-content-between">
  <span>Subtotal</span>
  <span>₹{subtotal.toLocaleString()}</span>
</div>
<div className="d-flex justify-content-between">
  <span>Shipping</span>
  <span><small>Enter address</small></span>
</div>
<hr />
<div className="d-flex justify-content-between fw-bold">
  <span>Total</span>
  <span>₹{total.toLocaleString()}</span>
</div>
<small className="text-muted">Including ₹{tax.toLocaleString()} in taxes</small>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
