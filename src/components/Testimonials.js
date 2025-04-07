import React from 'react';
import '../css/Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah K.',
    feedback: 'Absolutely love the scent! Long-lasting and elegant.',
  },
  {
    id: 2,
    name: 'Ravi M.',
    feedback: 'Perfect for daily wear. The compliments keep coming!',
  },
  {
    id: 3,
    name: 'Ananya S.',
    feedback: 'Great packaging and the fragrance is divine!',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section py-5 text-center">
      <div className="container">
        <h2 className="section-title mb-4">What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <p className="feedback">“{testimonial.feedback}”</p>
              <h6 className="name mt-3">- {testimonial.name}</h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
