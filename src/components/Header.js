import React, { useState } from 'react';
import './styles/Header.css';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="left">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Company Logo" className="logo" />
        <a href="/" className="company-name">
          Future<span className="highlight">X</span>Finance
        </a>
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
        <a href="#free-trial" className="button">Free Trial</a>
        <Link className='button' to = "/login">Login</Link>
      </div>
    </header>
  );
};

export default Header;