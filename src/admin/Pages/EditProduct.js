import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/AddProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    discount: '',
    quantity: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    const found = stored.find((p) => p.id === parseInt(id));
    if (found) {
      setProduct(found);
    } else {
      alert('Product not found');
      navigate('/admin/products');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    const updated = stored.map((p) => (p.id === parseInt(id) ? product : p));
    localStorage.setItem('products', JSON.stringify(updated));
    alert('✅ Product updated successfully!');
    navigate('/admin/products');
  };

  return (
    <div className="add-product-container">
      <h2 className="page-title">Edit Product</h2>
      <form className="add-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
            <label>Discount (%)</label>
            <input            
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label>Quantity</label>
            <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} rows="4" />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="image" value={product.image} onChange={handleChange} />
        </div>

        <button className="submit-btn" type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
