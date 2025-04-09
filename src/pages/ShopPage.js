import React, { useState } from 'react';
import scent1 from '../assets/images/scent1.jpg';
import scent2 from '../assets/images/scent2.jpg';
import scent3 from '../assets/images/scent3.jpg';
import scent4 from '../assets/images/1.png';
import scent5 from '../assets/images/9.png';
import scent6 from '../assets/images/2.png';
import '../css/Shop.css';

const scents = [
  { id: 1, name: 'KZ Black', price: 999, img: scent1 },
  { id: 2, name: 'KZ Seduced', price: 1299, img: scent2 },
  { id: 3, name: 'KZ Sports', price: 1499, img: scent3 },
  { id: 4, name: 'KZ Marine', price: 1599, img: scent4 },
  { id: 5, name: 'KZ Breeze', price: 1099, img: scent5 },
  { id: 6, name: 'KZ Wild', price: 1199, img: scent6 },
];

function ShopPage() {
  const [quantities, setQuantities] = useState({});
  const [loadingIds, setLoadingIds] = useState([]); // ✅ Track loading states

  const handleQtyChange = (id, delta) => {
    setQuantities(prev => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;

    // ✅ Prevent multiple clicks
    if (loadingIds.includes(product.id)) return;

    setLoadingIds(prev => [...prev, product.id]);

    // ✅ Timeout to simulate loading and debounce effect
    setTimeout(() => {
      const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
      const index = existingCart.findIndex(item => item.id === product.id);

      if (index !== -1) {
        existingCart[index].qty += qty;
      } else {
        existingCart.push({ ...product, qty });
      }

      localStorage.setItem('cart', JSON.stringify(existingCart));

      // ✅ Feedback
      alert(`${product.name} added to cart!`);

      // ✅ Remove loading state
      setLoadingIds(prev => prev.filter(id => id !== product.id));
    }, 300); // Simulated response delay
  };

  return (
    <section className="container py-5">
      <h2 className="text-center mb-5 best-seller-heading">All Perfumes</h2>
      <div className="row g-4">
        {scents.map((item) => {
          const isLoading = loadingIds.includes(item.id); // ✅

          return (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="featured-card h-100 d-flex flex-column">
                <div className="img-hover-wrap">
                  <img src={item.img} alt={item.name} />
                </div>
                <div className="card-body text-center d-flex flex-column pt-3">
                  <h5 className="popup-title">{item.name}</h5>
                  <p className="popup-price">₹{item.price}</p>

                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQtyChange(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="mx-3">{quantities[item.id] || 1}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQtyChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-dark featured-add-btn mt-auto w-100"
                    onClick={() => handleAddToCart(item)}
                    disabled={isLoading} // ✅ Disable while loading
                  >
                    {isLoading ? 'Adding...' : 'Add to Cart'} {/* ✅ Feedback text */}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ShopPage;
