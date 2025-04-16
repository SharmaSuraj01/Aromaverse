import React from 'react';

const BundleOfferList = ({ offers }) => {
  return (
    <div className="bundle-offer-list">
      <h2>Bundle Offers</h2>
      <ul>
        {offers.length > 0 ? (
          offers.map((offer, idx) => (
            <li key={idx}>
              <h4>{offer.offerName}</h4>
              <p>Products: {offer.selectedProducts.join(', ')}</p>
              <p>Type: {offer.bundleType}</p>
              <p>{offer.bundleType === 'discount' ? `Discount: ${offer.discount}%` : `Quantity: ${offer.quantity}`}</p>
            </li>
          ))
        ) : (
          <p>No offers available.</p>
        )}
      </ul>
    </div>
  );
};

export default BundleOfferList;
