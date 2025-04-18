import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // make sure db is correctly imported
import '../styles/AddProduct.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    discount: '',
    quantity: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          alert('Product not found!');
          navigate('/admin/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        ...product,
        price: Number(product.price),
        discount: Number(product.discount),
        quantity: Number(product.quantity)
      });

      alert('✅ Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('❌ Failed to update product');
    }
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
          <input type="number" name="discount" value={product.discount} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />
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
