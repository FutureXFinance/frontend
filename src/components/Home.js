import React from 'react';
import './styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1><span className='title'>Future<span className="titleX">X</span>Finance</span></h1>
          <p className='subtitle'>Empowering traders with cutting-edge high-frequency trading technology and advanced market analytics.</p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => window.location.href = '/signup'}>
                Get Started
            </button>
            <button className="secondary-btn" onClick={() => window.location.href = '/about'}>
                Learn More
            </button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Trading Solutions</h2>
        <div className="coming-soon-overlay">
          <div className="coming-soon-content">
            <h3>Coming Soon</h3>
            <p>We're working hard to bring you the future of trading technology</p>
          </div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>High-Frequency Trading</h3>
            <p>Execute trades at lightning speed with our advanced HFT platform</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>Algorithmic Trading</h3>
            <p>Deploy sophisticated trading algorithms with our robust platform</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Risk Management</h3>
            <p>Protect your investments with real-time risk monitoring</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Market Data</h3>
            <p>Access instant market insights and analytics</p>
          </div>
        </div>
      </section>

      <section className="resources-section">
        <h2>Resources</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>Documentation</h3>
            <p>Comprehensive guides and API documentation to help you get started.</p>
            <button className="resource-link" onClick={() => window.location.href = '/docs'}>
                View Docs <span>→</span>
            </button>
          </div>
          <div className="resource-card">
            <h3>Community</h3>
            <p>Join our community of traders and developers.</p>
            <button className="resource-link" onClick={() => window.location.href = '/community'}>
                Join Now <span>→</span>
            </button>
          </div>
          <div className="resource-card">
            <h3>Support</h3>
            <p>Get help and support from our dedicated team.</p>
            <button className="resource-link" onClick={() => window.location.href = '/support'}>
                Contact Us <span>→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;