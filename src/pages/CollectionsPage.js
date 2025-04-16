// src/pages/CollectionPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import FeaturedScents from '../components/FeaturedScents';

const CollectionPage = () => {
  const { category } = useParams();

  return (
    <div className="page-wrapper">
      <h2 className="page-title">
        {category?.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Collection'}
      </h2>
      <FeaturedScents filterGender={category} />
    </div>
  );
};

export default CollectionPage;
