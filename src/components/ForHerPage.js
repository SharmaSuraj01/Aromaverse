import React from 'react';
import FeaturedScents from '../components/FeaturedScents';
import '../css/PageContent.css';

const ForHerPage = () => {
  return (
    <div className="page-wrapper">
      <h2 className="page-title">Women</h2>
      <FeaturedScents filterGender="her" gridView={true} />
    </div>
  );
};

export default ForHerPage;
