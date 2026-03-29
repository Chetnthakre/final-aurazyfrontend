import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="section__container footer__container">
        <div className="footer__col">
          <div className="footer__logo">
            <Link to="/">FASHION</Link>
          </div>
          <p>Complete your style with awesome clothes from us.</p>
          <ul className="footer__socials">
            <li>
              <a href="https://www.facebook.com/chetan.thakre.169" target="_blank" rel="noopener noreferrer">
                <i className="ri-facebook-fill"></i>
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/aurazy.india?igsh=aTVjMnZtcjJqN3hj" target="_blank" rel="noopener noreferrer">
                <i className="ri-instagram-line"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="ri-twitter-fill"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/chetan-thakre-1a739a292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
                <i className="ri-linkedin-fill"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Company</h4>
          <ul className="footer__links">
            <li><a href="#">About</a></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul className="footer__links">
            <li><a href="#">Store Location</a></li>
            <li><a href="#">Order Tracking</a></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div className="footer__col">
          <h4>Legal</h4>
          <ul className="footer__links">
            <li><Link to="/legal/terms">Terms & Conditions</Link></li>
            <li><Link to="/legal/privacy">Privacy Policy</Link></li>
            <li><Link to="/legal/refund">Refund Policy</Link></li>
            <li><Link to="/legal/shipping">Shipping Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer__bar">
         © 2025 Aurazy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
