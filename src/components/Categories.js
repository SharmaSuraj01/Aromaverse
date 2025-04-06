import React from 'react';

function Categories() {
  // Example categories: For Him, For Her, For Kids
  const categories = [
    {
      title: 'For Him',
      description: 'Bold, confident scents crafted for men',
      img: 'https://via.placeholder.com/200',
    },
    {
      title: 'For Her',
      description: 'Elegant, timeless fragrances for women',
      img: 'https://via.placeholder.com/200',
    },
    {
      title: 'For Kids',
      description: 'Gentle, playful scents for the little ones',
      img: 'https://via.placeholder.com/200',
    },
  ];

  return (
    <section className="categories" id="categories">
      <h2>Find Your Perfect Scent</h2>
      <div className="categories__grid">
        {categories.map((cat, index) => (
          <div className="categories__item" key={index}>
            <img src={cat.img} alt={cat.title} />
            <h3>{cat.title}</h3>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
