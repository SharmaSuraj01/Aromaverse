import React, { useState, useEffect } from 'react';
import { MdListAlt, MdEdit, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(stored);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem('products', JSON.stringify(updated));
    }
  };

  const handleEdit = (product) => {
    navigate(`/admin/products/edit/${product.id}`);
  };

  const getFinalPrice = (price, discount) => {
    if (!price || !discount) return price;
    return price - (price * discount / 100);
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <MdListAlt size={28} style={{ color: '#f59e0b' }} />
        <h1>Product List</h1>
      </div>

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Discount (%)</th>
              <th>Final Price (₹)</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.price}</td>
                  <td>{p.discount || 0}</td>
                  <td>{getFinalPrice(p.price, p.discount)}</td>
                  <td>
                    {p.quantity <= 0 ? (
                      <span style={{ color: 'red', fontWeight: 600 }}>Out of Stock</span>
                    ) : p.quantity < 10 ? (
                      <span style={{ color: 'orange', fontWeight: 600 }}>Low Stock ({p.quantity})</span>
                    ) : (
                      <span style={{ color: 'green' }}>{p.quantity}</span>
                    )}
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(p)}>
                      <MdEdit />
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
