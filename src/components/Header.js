// filepath: /C:/Users/farde/OneDrive/Startup/FutureXFinance.com/frontend/src/components/Header.js
import React from 'react';
import './styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="left">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Company Logo" className="logo" />
        <span className="company-name">Future<span className="highlight">X</span>Finance</span>
      </div>
      <nav className="middle">
        <a href="#ai-agents">AI Agents</a>
        <a href="#download">Download</a>
        <a href="#pricing">Pricing</a>
        <a href="#resources">Resources</a>
        <a href="#support">Support</a>
      </nav>
      <div className="right">
        <a href="#free-trial" className="button">Free Trial</a>
        <a href="#login" className="button">Login</a>
      </div>
    </header>
  );
};

export default Header;