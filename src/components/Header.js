import React, { useState } from 'react';
import './styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="left">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Company Logo" className="logo" />
        <Link to="/" className="company-name">
          Future<span className="highlight">X</span>Finance
        </Link>
      </div>
      <div className="menu-icon" onClick={toggleMenu}>
        &#9776;
      </div>
      <nav className={`middle ${isMenuOpen ? 'open' : ''}`}>
        <Link to="#ai-agents">AI Agents</Link>
        <Link to="#download">Download</Link>
        <Link to="#pricing">Pricing</Link>
        <Link to="#resources">Resources</Link>
        <Link to="#support">Support</Link>
      </nav>
      <div className={`right ${isMenuOpen ? 'open' : ''}`}>
      <Link className='button' onClick={toggleMenu} to = "/SignIn">Sign In</Link>
        <Link className='button' onClick={toggleMenu} to = "/SignUp">Sign Up</Link>
      </div>
    </header>
  );
};

export default Header;