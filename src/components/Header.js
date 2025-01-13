import React, { useState } from 'react';
import './styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="left">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Company Logo" className="logo" />
        <span className="company-name">Future<span className="highlight">X</span>Finance</span>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      <nav className={`middle ${isMenuOpen ? 'open' : ''}`}>
        <a href="#ai-agents">AI Agents</a>
        <a href="#download">Download</a>
        <a href="#pricing">Pricing</a>
        <a href="#resources">Resources</a>
        <a href="#support">Support</a>
      </nav>
      <div className={`right ${isMenuOpen ? 'open' : ''}`}>
        <a href="#free-trial" className="button free-trial">Free Trial</a>
        <a href="#login" className="button login">Login</a>
      </div>
    </header>
  );
};

export default Header;