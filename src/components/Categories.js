import React from 'react';
import '../css/Categories.css';
import forhim from '../assets/images/forhim.jpg'; // Add this CSS file for styles
import forher from '../assets/images/forher.jpg'; // Add this CSS file for styles
import forkids from '../assets/images/forkid.jpg'; // Add this CSS file for styles

function Categories() {
  const categories = [
    {
      title: 'For Him',
      description: 'Bold, confident scents crafted for men',
      img: forhim,
    },
    {
      title: 'For Her',
      description: 'Elegant, timeless fragrances for women',
      img: forher,
    },
    {
      title: 'For Kids',
      description: 'Gentle, playful scents for the little ones',
      img: forkids,
    },
  ];

  return (
    <section className="categories-section py-5 bg-white text-center" id="categories">
      <h2 className="mb-5">Find Your Perfect Scent</h2>
      <div className="container">
        <div className="row justify-content-center">
          {categories.map((cat, index) => (
            <div className="col-10 col-sm-6 col-md-4 mb-4" key={index}>
              <div className="category-card p-3 shadow-sm h-100">
                <img src={cat.img} alt={cat.title} className="img-fluid rounded-circle mb-3 category-img" />
                <h4 className="mb-2 category-title">{cat.title}</h4>
                <p className="text-muted">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
