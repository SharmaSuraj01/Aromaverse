import React from 'react';
import FeaturedScents from '../components/FeaturedScents';
import '../css/PageContent.css';

const ForHerPage = () => {
  return (
     <div className="page-wrapper">
      <h2 className="page-title">Child</h2>
      <FeaturedScents filterGender="kids" gridView={true} />
    </div>
  );
};

export default ForHerPage;
