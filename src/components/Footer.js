import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Twitter, 
    Linkedin, 
    Github, 
    Mail,
    LineChart,
    Cpu,
    Shield,
    BookOpen,
    Users,
    HelpCircle
} from 'lucide-react';
import './styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Company Info Section */}
                <div className="footer-section">
                    <h3>FutureXFinance</h3>
                    <p className="company-description">
                        Empowering traders with cutting-edge high-frequency trading technology and advanced market analytics.
                    </p>
                    <div className="social-links">
                        <a href="https://twitter.com/futurexfinance_" target="_blank" rel="noopener noreferrer">
                            <Twitter size={20} />
                        </a>
                        <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://github.com/FutureXFinance" target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                        </a>
                    </div>
                </div>

                {/* Trading Solutions Section */}
                <div className="footer-section">
                    <h3>Trading Solutions</h3>
                    <ul>
                        <li>
                            <Link to="/solutions/hft">
                                <LineChart size={16} />
                                <span>High-Frequency Trading</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/solutions/algorithmic">
                                <Cpu size={16} />
                                <span>Algorithmic Trading</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/solutions/risk-management">
                                <Shield size={16} />
                                <span>Risk Management</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/solutions/market-data">
                                <LineChart size={16} />
                                <span>Real-time Market Data</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Resources Section */}
                <div className="footer-section">
                    <h3>Resources</h3>
                    <ul>
                        <li>
                            <Link to="/resources/documentation">
                                <BookOpen size={16} />
                                Documentation
                            </Link>
                        </li>
                        <li>
                            <Link to="/resources/api">
                                <Cpu size={16} />
                                API Reference
                            </Link>
                        </li>
                        <li>
                            <Link to="/resources/community">
                                <Users size={16} />
                                Community
                            </Link>
                        </li>
                        <li>
                            <Link to="/resources/blog">
                                <BookOpen size={16} />
                                Trading Insights
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className="footer-section">
                    <h3>Support</h3>
                    <ul>
                        <li>
                            <Link to="/support/help">
                                <HelpCircle size={16} />
                                Help Center
                            </Link>
                        </li>
                        <li>
                            <Link to="/support/contact">
                                <Mail size={16} />
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/support/status">
                                <Cpu size={16} />
                                System Status
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact Info Section */}
                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <div className="contact-info">
                        <div className="contact-item">
                            <Mail size={16} />
                            <span>support@futurexfinance.com</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>&copy; {new Date().getFullYear()} FutureXFinance. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/compliance">Compliance</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;