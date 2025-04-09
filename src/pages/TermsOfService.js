import React from 'react';
import '../css/TermsOfService.css';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h2 className="terms-title">Terms of Service</h2>

        <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, accessible at HouseOfEm5.com.</p>

        <p>These Terms will be applied fully and affect your use of this Website. By using this Website, you agree to accept all terms and conditions written here. You must not use this Website if you disagree with any of these terms.</p>

        <h4 className="section-heading">Intellectual Property Rights</h4>
        <p>Other than content you own, under these Terms, HouseOfEm5 and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
        <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>

        <h4 className="section-heading">Restrictions</h4>
        <ul>
          <li>Publishing any Website material in any other media</li>
          <li>Selling, sublicensing and/or otherwise commercializing any Website material</li>
          <li>Publicly performing and/or showing any Website material</li>
          <li>Using this Website in any way that is or may be damaging</li>
          <li>Engaging in any data mining, data harvesting or extracting</li>
          <li>Using this Website to engage in any advertising or marketing</li>
        </ul>

        <h4 className="section-heading">Your Content</h4>
        <p>“Your Content” means any audio, video, text, images or other material you choose to display on this Website. By displaying it, you grant HouseOfEm5 a non-exclusive, worldwide license to use, reproduce, adapt, and publish it.</p>

        <h4 className="section-heading">No Warranties</h4>
        <p>This Website is provided “as is,” and HouseOfEm5 expresses no representations or warranties of any kind.</p>

        <h4 className="section-heading">Limitation of Liability</h4>
        <p>In no event shall HouseOfEm5 or its employees be held liable for any damages arising out of or in any way connected with your use of this Website.</p>

        <h4 className="section-heading">Indemnification</h4>
        <p>You hereby indemnify HouseOfEm5 from and against any and all liabilities, costs, and expenses arising from your breach of these Terms.</p>

        <h4 className="section-heading">Severability</h4>
        <p>If any provision is found invalid, it shall be deleted without affecting the remaining provisions.</p>

        <h4 className="section-heading">Variation of Terms</h4>
        <p>HouseOfEm5 is permitted to revise these Terms at any time.</p>

        <h4 className="section-heading">Assignment</h4>
        <p>HouseOfEm5 may assign its rights and/or obligations without notification.</p>

        <h4 className="section-heading">Entire Agreement</h4>
        <p>These Terms constitute the entire agreement between HouseOfEm5 and you regarding this Website.</p>

        <h4 className="section-heading">Governing Law & Jurisdiction</h4>
        <p>These Terms are governed by Indian laws. You submit to the jurisdiction of Indian courts for the resolution of any disputes.</p>
      </div>
    </div>
  );
};

export default TermsOfService;
