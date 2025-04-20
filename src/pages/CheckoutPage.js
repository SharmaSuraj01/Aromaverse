import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import axios from 'axios';
import { ref, getDownloadURL } from 'firebase/storage';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialCart = location.state?.cartItems || JSON.parse(localStorage.getItem('cart')) || [];
  const [cartItems, setCartItems] = useState(initialCart);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0), [cartItems]);
  const tax = useMemo(() => Math.round(subtotal * 0.15), [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [phone, setPhone] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('razorpay');

  const [allStates, setAllStates] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    axios.post('https://countriesnow.space/api/v0.1/countries/states', { country: 'India' })
      .then(res => {
        const states = res.data.data.states.map(s => ({ label: s.name, value: s.name }));
        setAllStates(states);
      });

    axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', { country: 'India', state: 'Uttar Pradesh' })
      .then(res => setCityOptions(res.data.data));
  }, []);

  const handleStateChange = async (selected) => {
    setState(selected.value);
    setCity('');
    setPin('');
    try {
      const res = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country: 'India',
        state: selected.value
      });
      const cities = res.data.data.map(c => ({ label: c, value: c }));
      setCityOptions(cities);
    } catch (err) {
      setCityOptions([]);
    }
  };

  const handleCityChange = async (selected) => {
    setCity(selected.value);
    try {
      const res = await axios.get(`https://api.postalpincode.in/postoffice/${selected.value}`);
      const postOffices = res.data[0]?.PostOffice;
      if (postOffices?.length > 0) {
        setPin(postOffices[0].Pincode);
      }
    } catch (err) {
      setPin('');
    }
  };

  const allRequiredFilled = () =>
    email && firstName && address && city && state && pin && phone;

  const placeOrderInFirebase = async () => {
    const shippingInfo = {
      name: `${firstName} ${lastName}`,
      phone,
      address: `${address}, ${city}, ${state}, ${pin}`
    };

    const newOrder = {
      id: uuidv4().split('-')[0].toUpperCase(),
      userId: user.uid,
      email,
      timestamp: new Date(),
      items: cartItems,
      shipping: shippingInfo,
      status: 'Pending 🕒',
      paymentMethod,
      subtotal,
      tax,
      total
    };

    await addDoc(collection(db, 'orders'), newOrder);
  };

  const handlePayment = async () => {
    if (!allRequiredFilled()) {
      setShowErrorPopup(true);
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    if (paymentMethod === 'razorpay') {
      alert('Redirecting to Razorpay...');
    } else if (paymentMethod === 'cod') {
      await placeOrderInFirebase();
      localStorage.removeItem('cart');
      navigate('/thank-you', { state: { orderSuccess: true, cartItems } });
    }
  };

  const updateQty = (index, newQty) => {
    if (newQty < 1) return;
    const updatedCart = [...cartItems];
    updatedCart[index].qty = newQty;
    setCartItems(updatedCart);
  };

  // Fetch products and image URLs
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const fetchedProducts = [];

        for (const doc of querySnapshot.docs) {
          const productData = doc.data();
          let imageUrl = '';

          try {
            const imageRef = ref(storage, `product-images/${productData.imageName}`);
            imageUrl = await getDownloadURL(imageRef);
          } catch (e) {
            console.warn(`No image found for ${productData.name}`);
          }

          fetchedProducts.push({
            id: doc.id,
            ...productData,
            imageUrl,
          });
        }

        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-7">
          <h2 className="mb-4">Checkout</h2>
          <form>
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
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">State <span className="text-danger">*</span></label>
                <Select options={allStates} onChange={handleStateChange} placeholder="Select state" />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">City <span className="text-danger">*</span></label>
                <Select options={cityOptions} onChange={handleCityChange} placeholder="Select city" isDisabled={!state} />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">PIN <span className="text-danger">*</span></label>
              <input type="text" className="form-control" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter PIN code" />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone number <span className="text-danger">*</span></label>
              <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <h5>Payment</h5>
            <div className="p-3 border rounded mb-3 bg-light">
              <div className="form-check mb-2">
                <input className="form-check-input" type="radio" name="paymentMethod" id="razorpayOption" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} />
                <label className="form-check-label" htmlFor="razorpayOption">
                  Pay with Razorpay
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="paymentMethod" id="codOption" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                <label className="form-check-label" htmlFor="codOption">
                  Cash on Delivery
                </label>
              </div>
            </div>
            <button type="button" className="btn btn-primary w-100" onClick={handlePayment}>
              Place Order
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <h3>Order Summary</h3>
          <div className="border p-3 rounded bg-light">
            {cartItems.map((item, index) => {
              const productDetails = products.find(p => p.name === item.name || p.id === item.id);
              const imageUrl = productDetails?.imageUrl || (productDetails?.images?.[0]) || 'https://via.placeholder.com/60';

              return (
                <div key={index} className="d-flex mb-3">
                  <img
                    src={imageUrl}
                    alt={productDetails?.name || item.name}
                    className="img-fluid"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div className="ms-3">
                    <p>{productDetails?.name || item.name}</p>
                    <p>Qty: {item.qty} | ₹{item.price * item.qty}</p>
                    <div className="d-flex align-items-center">
                      <button onClick={() => updateQty(index, item.qty - 1)} className="btn btn-sm btn-outline-secondary">-</button>
                      <span className="mx-2">{item.qty}</span>
                      <button onClick={() => updateQty(index, item.qty + 1)} className="btn btn-sm btn-outline-secondary">+</button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="d-flex justify-content-between">
              <p><strong>Subtotal</strong></p>
              <p>₹{subtotal}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p><strong>Tax (15%)</strong></p>
              <p>₹{tax}</p>
            </div>
            <div className="d-flex justify-content-between">
              <p><strong>Total</strong></p>
              <p>₹{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
