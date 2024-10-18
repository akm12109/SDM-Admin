import React from 'react';
import './css/developer.css'; // Adding the animations in a separate CSS file


const DeveloperSupport = () => {
  return (
    <div className="developer-support-container">
      <div className="header-section">
        <h1 className="main-heading">Developer Support</h1>
        <p className="sub-heading">Your trusted developers, ready to assist</p>
      </div>

      <div className="developer-grid">
        {/* Developer 1 */}
        <div className="developer-card">
          <div className="card-inner">
            <div className="developer-photo-container">
              <img src="/akmstar.png" alt="Dev" className="developer-photo" />
            </div>
            <h2 className="developer-name">Akash Akm</h2>
            <p className="developer-title">Full Stack Developer</p>

            <div className="developer-contact">
              <p><strong>Email:</strong> akmpublicservice@gmail.com</p>
              <p><strong>Phone:</strong> +91 62023 26183</p>
              <p><strong>Telegram:</strong> @AkmXTeam</p>
              <p><strong>WhatsApp:</strong> +91 62023 26183</p>
            </div>
          </div>
        </div>

        {/* Developer 2 */}
        <div className="developer-card">
          <div className="card-inner">
            <div className="developer-photo-container">
              <img src="developer2.jpg" alt="Developer 2" className="developer-photo" />
            </div>
            <h2 className="developer-name">Deepak </h2>
            <p className="developer-title">Backend Developer</p>

            <div className="developer-contact">
              <p><strong>Email:</strong> sarah@devsupport.com</p>
              <p><strong>Phone:</strong> +987654321</p>
              <p><strong>Telegram:</strong> @SarahDevSupport</p>
              <p><strong>WhatsApp:</strong> +987654321</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperSupport;
