import React from 'react';
import '../css/ContactUs.css'; 
import Footer from '../components/Footer';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="container">
        <h2 className="text-center mb-4">Get in Touch with Us</h2>
        <p className="text-center mb-5">
          For all enquiries, please email us using the form below.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name *</label>
                <input type="text" id="name" className="form-control" placeholder="Your Name" required />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email *</label>
                <input type="email" id="email" className="form-control" placeholder="Your Email" required />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input type="tel" id="phone" className="form-control" placeholder="Your Phone Number" required />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="form-label">Message *</label>
                <textarea id="message" className="form-control" rows="5" placeholder="Your Message" required></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;