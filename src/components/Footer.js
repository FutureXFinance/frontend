import React from 'react';
import './styles/Footer.css';

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
          <a href="https://x.com/FutureXFinance_">Twitter</a>
          <a href="https://youtube.com">YouTube</a>
          <a href="https://telegram.org">Telegram</a>
        </div>
        <div className="footer-company">
          <h4>Company</h4>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/news">News & Updates</a>
          <a href="/pricing">Pricing</a>
          <a href="/services">Services</a>
          <a href="/careers">Careers</a>
        </div>
        <div className="footer-platform">
          <h4>Platform</h4>
          <a href="/market-data">Real-time Market Data</a>
          <a href="/trading-bot">Smart Trading Bot</a>
          <a href="/automated-tools">Automated Trading Tools</a>
          <a href="/portfolio-manager">Portfolio Manager</a>
          <a href="/investment-insights">AI-Driven Investment Insights</a>
          <a href="/copy-traders">Copy Top Traders Portfolios</a>
          <a href="/exchange-integrations">Crypto Exchange Integrations</a>
        </div>
        {/* <div className="footer-trading-bots">
          <h4>Trading Bots</h4>
          <a href="/binance-bot">Binance Trading Bot</a>
          <a href="/kucoin-bot">KuCoin Trading Bot</a>
          <a href="/bybit-bot">Bybit Trading Bot</a>
          <a href="/okx-bot">OKX Trading Bot</a>
          <a href="/coinbase-bot">Coinbase Trading Bot</a>
          <a href="/mexc-bot">MEXC Trading Bot</a>
        </div> */}
        <div className="footer-resources">
          <h4>Resources</h4>
          <a href="/blog">Blog</a>
          <a href="/faqs">FAQs</a>
          <a href="/terms">Terms of Use</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/sitemap">Sitemap</a>
        </div>
        <div className="footer-support">
          <h4>Support</h4>
          <a href="/support">Customer Support</a>
          <a href="/tutorials">Tutorials</a>
          <a href="/partner-program">Partner Program</a>
        </div>
      </div>
      <p className='footer-copyright'>&copy; 2025 FutureXFinance. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;