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
            <button className="primary-btn">Start Trading</button>
            <button className="secondary-btn">View Demo</button>
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
            <p>Comprehensive guides and API documentation</p>
            <a href="#" className="resource-link">Learn More →</a>
          </div>
          <div className="resource-card">
            <h3>Trading Academy</h3>
            <p>Learn advanced trading strategies</p>
            <a href="#" className="resource-link">Start Learning →</a>
          </div>
          <div className="resource-card">
            <h3>Market Insights</h3>
            <p>Daily market analysis and reports</p>
            <a href="#" className="resource-link">View Reports →</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;