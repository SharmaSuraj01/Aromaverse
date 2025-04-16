import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BundleOffer.css';

const AddBundleOffer = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [offerName, setOfferName] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bundleType, setBundleType] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');

  const productOptions = ['Product 1', 'Product 2', 'Product 3'];

  const handleProductSelect = (product) => {
    if (product && !selectedProducts.includes(product)) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOffer = {
      offerName,
      selectedProducts,
      bundleType,
      discount,
      quantity,
    };
    
    onSubmit(newOffer); // Call the onSubmit function passed from parent to add the new offer

    // After adding the offer, navigate back to the offer list
    navigate('/bundleoffers');

    // Reset the form fields after submission
    setOfferName('');
    setSelectedProducts([]);
    setBundleType('');
    setDiscount('');
    setQuantity('');
  };

  return (
    <div className="add-product-container">
      <h2 className="page-title">Add Bundle Offer</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Offer Name</label>
          <input
            type="text"
            value={offerName}
            onChange={(e) => setOfferName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Products</label>
          <select onChange={(e) => handleProductSelect(e.target.value)} value="">
            <option value="">-- Select Product --</option>
            {productOptions.map((product, idx) => (
              <option
                key={idx}
                value={product}
                disabled={selectedProducts.includes(product)}
              >
                {product}
              </option>
            ))}
          </select>
          <ul>
            {selectedProducts.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="form-group">
          <label>Bundle Type</label>
          <select
            value={bundleType}
            onChange={(e) => setBundleType(e.target.value)}
            required
          >
            <option value="">-- Select Type --</option>
            <option value="buy_2_get_1">Buy 2 Get 1</option>
            <option value="discount">Discount</option>
          </select>
        </div>

        {bundleType === 'discount' && (
          <div className="form-group">
            <label>Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
          </div>
        )}

        {bundleType === 'buy_2_get_1' && (
          <div className="form-group">
            <label>Quantity (Buy X Get Y)</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Add Offer
        </button>
      </form>
    </div>
  );
};

export default AddBundleOffer;
