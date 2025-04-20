import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useCart } from '../Context/CartContext';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import '../css/ProductDetailPage.css';

// Feature Icons
import parabenFree from '../assets/images/paraben-free.png';
import sulphateFree from '../assets/images/sulphate-free.png';
import crueltyFree from '../assets/images/cruelty-free.png';
import non from '../assets/images/non-carc.png';
import siliconFree from '../assets/images/silicon-free.png';
import ShopPage from './ShopPage';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState(''); // State to store the username
  const navigate = useNavigate();
  const { addToCart, setShowCartModal } = useCart();

  const productDescriptions = {
    'TEJASI': 'A luxurious fragrance for women...',
    'AQUA': 'A refreshing fragrance for men...',
    'YODHA': 'An oriental fragrance for men...',
    'VAHINI': 'A sweet and gentle fragrance for kids...',
    'VAASNA': 'A sophisticated fragrance for men...',
    'SENORA': 'A floral fragrance for women...',
    'TANTRA': 'A dynamic and bold fragrance for men...',
  };

  // Fetch the logged-in user details
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || 'Anonymous'); // Set username if logged in, otherwise fallback to 'Anonymous'
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = await getDoc(doc(db, 'products', id));
        if (productDoc.exists()) {
          const fetchedProduct = productDoc.data();
          setProduct({
            ...fetchedProduct,
            description: productDescriptions[fetchedProduct.name] || 'No description available.',
          });
        }
      } catch (err) {
        console.error('Error loading product:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, qty: 1 });
    setShowCartModal(true);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, qty: 1 });
    navigate('/checkout');
  };

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = async () => {
    if (reviewText.trim() === '') {
      return alert('Please write a review before submitting.');
    }

    try {
      const reviewData = {
        text: reviewText,
        author: userName, // Use the logged-in username
        date: new Date(),
      };

      const productRef = doc(db, 'products', id);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        const productReviews = productDoc.data().reviews || [];
        await updateDoc(productRef, {
          reviews: [...productReviews, reviewData],
        });

        setReviews([...productReviews, reviewData]);
        setReviewText('');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const displayReviews = () => {
    return reviews.map((review, index) => (
      <div className="review-item" key={index}>
        <p>{review.text}</p>
        <p className="review-author">- {review.author}</p>
      </div>
    ));
  };

  if (!product) return <p>Loading...</p>;

  // Feature icons array
  const features = [
    parabenFree,
    sulphateFree,
    crueltyFree,
    non,
    siliconFree,
  ];

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

            {/* Horizontal Features Icons */}
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
        <textarea
          className="review-form"
          placeholder="Write your review here..."
          value={reviewText}
          onChange={handleReviewChange}
          rows="4"
        ></textarea>
        <button onClick={handleSubmitReview}>Submit Review</button>

        <div className="review-list">{displayReviews()}</div>
      </div>
      <ShopPage categoryTitle="Similar Products" />

    </div>
  );
}

export default ProductDetailPage;
