// src/pages/CollectionPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import FeaturedScents from '../components/FeaturedScents';

const CollectionPage = () => {
  const { category } = useParams();

  const titleMap = {
    'for-her': 'For Her',
    'for-him': 'For Him',
    'kids': 'For Kids',
  };

  const genderMap = {
    'for-her': 'her',
    'for-him': 'him',
    'kids': 'kids',
  };

  const pageTitle = titleMap[category] || 'Collection';
  const filterGender = genderMap[category] || '';

  return (
    <div className="page-wrapper">
      <h2 className="page-title">{pageTitle}</h2>
      <FeaturedScents filterGender={filterGender} />
    </div>
  );
};

export default CollectionPage;
