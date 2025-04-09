import React from 'react';
import '../css/PrivacyPolicy.css';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <>
      <div className="privacy-policy">
        <div className="privacy-container">
          <h2 className="title">Privacy Policy</h2>
          <p>
            This section pertains to the Privacy Policy of <strong>Kizu-web</strong>. We would like to inform you that our privacy policy is subject to change without prior intimation and you shall be required to review it regularly.
          </p>
          <p>
            The protection and security of your personal information is one of House of Em5’s top priorities...
          </p>
          <p>
            By accessing or using this website, you expressly consent to our use and disclosure...
          </p>
          <p>
            <strong>“Personal Information”</strong> refers to any information that identifies or can be used to identify...
          </p>

          <h3>PLEASE READ THE FOLLOWING TERMS OF OUR PRIVACY POLICY</h3>
          <h4>PERSONAL INFORMATION COLLECTED</h4>
          <p>
            By accepting this privacy policy, you authorize <strong>Kizu-web</strong> to collect...
          </p>
          <ul>
            <li>All information entered by you such as your name, address...</li>
            <li>Information collected via cookies installed on your device.</li>
            <li>Details like your IP address, browser type, etc.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
