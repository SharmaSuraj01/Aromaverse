import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import { products } from '../data/products';
import '../css/ProductDetailPage.css';
import parabenFree from '../assets/photo/paraben-free.png';
import sulphateFree from '../assets/photo/sulphate-free.png';
import crueltyFree from '../assets/photo/cruelty-free.png';
import non from '../assets/photo/non-carc.png';
import siliconFree from '../assets/photo/silicon-free.png';
import ShopPage from './ShopPage';

function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart, setShowCartModal } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState('');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, qty: 1 });
    setShowCartModal(true);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, qty: 1 });
    navigate('/checkout');
  };

  const handleSubmitReview = () => {
    if (!reviewText.trim()) {
      return alert('Please write a review before submitting.');
    }
    
    if (!user) {
      return alert('Please login to submit a review.');
    }

    const newReview = {
      text: reviewText,
      author: user.displayName || user.name || 'Anonymous',
      date: new Date().toLocaleDateString()
    };

    setProduct(prev => ({
      ...prev,
      reviews: [...(prev.reviews || []), newReview]
    }));
    
    setReviewText('');
    alert('Review submitted successfully!');
  };

  if (!product) return <p>Product not found</p>;

  const features = [parabenFree, sulphateFree, crueltyFree, non, siliconFree];

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image">
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/300'}
            alt={product.name}
          />
        </div>
        <div className="product-details">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">₹{product.price}</p>
          <p className="product-description">{product.description}</p>
          <div className="star-rating">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-half"></i>
            <i className="bi bi-star"></i>
          </div>
          <div className="product-actions">
            <button className="btn btn-dark add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-danger buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
            <div className="features-icons">
              {features.map((img, idx) => (
                <img src={img} key={idx} alt={`feature-${idx}`} className="feature-icon-img" />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="review-section">
        <h3>Write a Review</h3>
        {user ? (
          <>
            <textarea
              className="review-form"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows="4"
            />
            <button onClick={handleSubmitReview}>Submit Review</button>
          </>
        ) : (
          <p>Please <button onClick={() => navigate('/login')} className="btn btn-link">login</button> to write a review.</p>
        )}
        
        <div className="review-list">
          {product.reviews?.map((review, index) => (
            <div className="review-item" key={index}>
              <p>{review.text}</p>
              <p className="review-author">- {review.author} ({review.date})</p>
            </div>
          ))}
        </div>
      </div>
      
      <ShopPage categoryTitle="Similar Products" />
    </div>
  );
}

export default ProductDetailPage;
