import React from 'react';
import FeaturedScents from '../components/FeaturedScents';
import '../css/PageContent.css';

const ForHimPage = () => {
  return (
    <div className="page-wrapper">
  <h2 className="page-title">For Him</h2>
  <FeaturedScents filterGender="him" />
</div>
  );
};

export default ForHimPage;