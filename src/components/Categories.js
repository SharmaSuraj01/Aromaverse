import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Categories.css';
import forhim from '../assets/photo/men.jpg';
import forher from '../assets/photo/women.jpg';
import forkids from '../assets/photo/child.jpg';

function Categories() {
  const categories = [
    {
      title: 'Men',
      description: 'Bold, confident scents — meticulously crafted for the modern man.',
      img: forhim,
      link: '/for-him',
    },
    {
      title: 'Women',
      description: 'Elegant, timeless fragrances — designed to capture the essence of femininity.',
      img: forher,
      link: '/for-her',
    },
    {
      title: 'Child',
      description: 'Gentle, playful fragrances — perfect for the little ones.',
      img: forkids,
      link: '/for-kids',
    },
  ];

  return (
    <section className="categories-section py-5 bg-white text-center" id="categories">
    

      <h2 className="mb-5">Find Your Perfect Scent</h2>
      <div className="container">
        <div className="row justify-content-center">
          {categories.map((cat, index) => (
            <div className="col-10 col-sm-6 col-md-4 mb-4" key={index}>
              <Link to={cat.link} className="text-decoration-none text-dark">
                <div className="category-card p-3 shadow-sm h-100">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="img-fluid rounded-circle mb-3 category-img"
                  />
                  <h4 className="mb-2 category-title">{cat.title}</h4>
                  <p className="text-muted">{cat.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
