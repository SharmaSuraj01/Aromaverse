import React from 'react';
import FeaturedScents from '../components/FeaturedScents';
import '../css/PageContent.css';

const ForHerPage = () => {
  return (
     <div className="page-wrapper">
      <h2 className="page-title">For Kids</h2>
      <FeaturedScents filterGender="kids" />
    </div>
  );
};

export default ForHerPage;
