import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase'; // Make sure this path is correct
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage functions
import '../styles/AddProduct.css';

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    discount: '',
    quantity: '',
    description: '',
    category: '',
    images: [], // This will store actual file objects now
    faqs: []
  });

  const [imagePreviews, setImagePreviews] = useState([]); // Preview URLs for displaying images
  const [faq, setFaq] = useState({ question: '', answer: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setProduct((prev) => ({ ...prev, images: files })); // Save the actual files
    setImagePreviews(previews); // Save the preview URLs
  };

  const handleFAQChange = (e) => {
    const { name, value } = e.target;
    setFaq((prev) => ({ ...prev, [name]: value }));
  };

  const addFAQ = () => {
    if (faq.question.trim() && faq.answer.trim()) {
      setProduct((prev) => ({
        ...prev,
        faqs: [...(prev.faqs || []), faq]
      }));
      setFaq({ question: '', answer: '' });
    } else {
      alert('❗ Please fill in both question and answer');
    }
  };

  const removeFAQ = (index) => {
    setProduct((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Upload all images to Firebase Storage and get their download URLs
      const imageUploadPromises = product.images.map(async (file) => {
        const fileRef = ref(storage, `product-images/${Date.now()}-${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        return url; // Return the download URL of the uploaded file
      });

      const uploadedImageUrls = await Promise.all(imageUploadPromises);

      // 2. Save product with image URLs to Firestore
      const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        images: uploadedImageUrls, // Store the URLs in the 'images' field
        createdAt: serverTimestamp()
      });

      alert('✅ Product added successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('❌ Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <div className="add-product-container">
      <h2 className="page-title">Add New Product</h2>
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
          <label>Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} rows="4" />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select category</option>
            <option>For Him</option>
            <option>For Her</option>
            <option>For Kids</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Images</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        </div>

        {imagePreviews.length > 0 && (
          <div className="image-preview-container">
            {imagePreviews.map((img, idx) => (
              <img key={idx} src={img} alt={`preview-${idx}`} className="image-preview" />
            ))}
          </div>
        )}

        <div className="faq-section">
          <h3>FAQs</h3>
          <div className="form-group">
            <label>Question</label>
            <input
              type="text"
              name="question"
              value={faq.question}
              onChange={handleFAQChange}
              placeholder="Enter FAQ question"
            />
          </div>
          <div className="form-group">
            <label>Answer</label>
            <textarea
              name="answer"
              value={faq.answer}
              onChange={handleFAQChange}
              placeholder="Enter FAQ answer"
            />
          </div>
          <button type="button" className="add-faq-btn" onClick={addFAQ}>
            ➕ Add FAQ
          </button>

          {product.faqs.length > 0 && (
            <ul className="faq-list">
              {product.faqs.map((item, idx) => (
                <li key={idx}>
                  <strong>Q:</strong> {item.question}<br />
                  <strong>A:</strong> {item.answer}
                  <button type="button" onClick={() => removeFAQ(idx)} className="remove-faq-btn">❌</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
