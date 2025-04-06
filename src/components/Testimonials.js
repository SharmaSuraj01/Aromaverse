import React from 'react';

function Testimonials() {
  const testimonials = [
    {
      name: 'John Doe',
      feedback: 'Absolutely in love with the fragrance. It lasts all day!',
    },
    {
      name: 'Jane Smith',
      feedback: 'Kizu Perfumes has become my go-to for every occasion.',
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonials__list">
        {testimonials.map((t, index) => (
          <div className="testimonial" key={index}>
            <p>{t.feedback}</p>
            <h4>- {t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
