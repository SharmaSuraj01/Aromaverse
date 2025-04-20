import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Categories.css';
import forhim from '../assets/images/forhim.jpg';
import forher from '../assets/images/forher.jpg';
import forkids from '../assets/images/forkid.jpg';

function Categories() {
  const categories = [
    {
      title: 'For Him',
      description: 'Bold, confident scents crafted for men',
      img: forhim,
      link: '/for-him',
    },
    {
      title: 'For Her',
      description: 'Elegant, timeless fragrances for women',
      img: forher,
      link: '/for-her',
    },
    {
      title: 'For Kids',
      description: 'Gentle, playful scents for the little ones',
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
