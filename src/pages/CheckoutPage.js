import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialCart = location.state?.cartItems || JSON.parse(localStorage.getItem('cart')) || [];
  const [cartItems, setCartItems] = useState(initialCart);

  // Update localStorage when cartItems change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems]
  );
  const tax = useMemo(() => Math.round(subtotal * 0.15), [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const [user, setUser] = useState(null);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');
  const [phone, setPhone] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handlePayment = () => {
    if (!email || !firstName || !address || !city || !state || !pin || !phone) {
      setShowErrorPopup(true);
      return;
    }

    if (user) {
      alert('Redirecting to Razorpay...');
    } else {
      navigate('/login');
    }
  };

  const updateQty = (index, newQty) => {
    if (newQty < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].qty = newQty;
    setCartItems(updatedCart);
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* Left Side Form */}
        <div className="col-md-7">
          <h2 className="mb-4">Checkout</h2>
          <form className="needs-validation">
            <h5>Contact Information</h5>
            <div className="mb-3">
              <label className="form-label">Email <span className="text-danger">*</span></label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <h5 className="mt-4">Shipping Address</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First name <span className="text-danger">*</span></label>
                <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Last name</label>
                <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Address <span className="text-danger">*</span></label>
              <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Apartment, suite, etc. (optional)</label>
              <input type="text" className="form-control" placeholder="Apartment, suite, etc." />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City <span className="text-danger">*</span></label>
                <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">State <span className="text-danger">*</span></label>
                <select className="form-select" value={state} onChange={(e) => setState(e.target.value)} required>
                  <option value="">Choose...</option>
                  <option>Uttar Pradesh</option>
                  <option>Delhi</option>
                  <option>Maharashtra</option>
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <label className="form-label">PIN <span className="text-danger">*</span></label>
                <input type="text" className="form-control" value={pin} onChange={(e) => setPin(e.target.value)} required />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Phone number <span className="text-danger">*</span></label>
              <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

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

        {/* Right Side Order Summary */}
        <div className="col-md-5">
          <div className="bg-light p-4 rounded shadow-sm">
            <h5 className="mb-4">Order Summary</h5>
            {cartItems.map((item, index) => (
              <div key={item.id} className="d-flex mb-3 align-items-center">
                <img src={item.img} alt={item.name} className="img-thumbnail me-3" style={{ width: '80px' }} />
                <div className="flex-grow-1">
                  <p className="mb-1 fw-semibold">{item.name}</p>
                  <div className="d-flex align-items-center mb-2">
                    <button className="btn btn-sm btn-outline-dark me-2" onClick={() => updateQty(index, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button className="btn btn-sm btn-outline-dark ms-2" onClick={() => updateQty(index, item.qty + 1)}>+</button>
                  </div>
                  <p className="fw-bold mb-0">₹{item.price * item.qty}</p>
                </div>
              </div>
            ))}

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

      {/* Centered Popup */}
      {showErrorPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1055 }}
          onClick={() => setShowErrorPopup(false)}
        >
          <div className="bg-white p-4 rounded shadow" style={{ maxWidth: '400px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <h5 className="mb-3">Missing Required Fields</h5>
            <p>Please fill in all required details before proceeding to payment.</p>
            <button className="btn btn-dark w-100" onClick={() => setShowErrorPopup(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
