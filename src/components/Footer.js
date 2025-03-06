import React from 'react';
import './styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="FutureXFinance Logo" />
          <p>FutureXFinance</p>
        </div>
  
        <div className="footer-connect">
          <h4>Connect with Us</h4>
          <Link to="https://x.com/FutureXFinance_">Twitter</Link>
          <Link to="https://youtube.com">YouTube</Link>
          <Link to="https://telegram.org">Telegram</Link>
        </div>
        <div className="footer-company">
          <h4>Company</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/news">News & Updates</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/services">Services</Link>
          <Link to="/careers">Careers</Link>
        </div>
        <div className="footer-platform">
          <h4>Platform</h4>
          <Link to="/market-data">Real-time Market Data</Link>
          <Link to="/trading-bot">Smart Trading Bot</Link>
          <Link to="/automated-tools">Automated Trading Tools</Link>
          <Link to="/portfolio-manager">Portfolio Manager</Link>
          <Link to="/investment-insights">AI-Driven Investment Insights</Link>
          <Link to="/copy-traders">Copy Top Traders Portfolios</Link>
          <Link to="/exchange-integrations">Crypto Exchange Integrations</Link>
        </div>
        <div className="footer-resources">
          <h4>Resources</h4>
          <Link to="/blog">Blog</Link>
          <Link to="/faqs">FAQs</Link>
          <Link to="/terms">Terms of Use</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
        <div className="footer-support">
          <h4>Support</h4>
          <Link to="/support">Customer Support</Link>
          <Link to="/tutorials">Tutorials</Link>
          <Link to="/partner-program">Partner Program</Link>
        </div>
      </div>
      <p className='footer-copyright'>&copy; 2025 FutureXFinance. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;