import React from 'react';
import '../css/RefundPolicy.css';
import Footer from '../components/Footer';

const RefundPolicy = () => {
  return (
    <div className="refund-policy-page">
      <div className="refund-container">
        <h2 className="refund-title">Refund Policy</h2>

        <h4 className="refund-subtitle">HOW DO I KNOW IF AN ITEM IS ELIGIBLE FOR RETURN?</h4>
        <p>Our products are not eligible for Return/Exchange.</p>

        <h4 className="refund-subtitle">WHAT IF I RECEIVE A DAMAGED / DEFECTIVE / WRONG PRODUCT?</h4>
        <p>
          We Quality Control all our shipping and packaging processes, but in rare circumstances, if you do receive a damaged,
          defective/wrong product or an incomplete order, simply get in touch with us within <strong>24 hours</strong> of receiving
          your order with pictures at <strong>em5support[@]indiainfotech.com</strong> and we will take care of the rest.
        </p>

        <p>
          For <strong>failed online transactions</strong>, refunds are automatically processed to the source account in <strong>7 working days</strong>.
        </p>

        <p>
          In case of damaged or defective product, please share an unboxing video for the claim processing. Post examination,
          a refund or replacement will be issued in <strong>4-7 days</strong>.
        </p>
      </div>

      <div className="spacer" />
    </div>
  );
};

export default RefundPolicy;
