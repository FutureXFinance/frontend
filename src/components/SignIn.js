import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    MailIcon, 
    LockIcon, 
    EyeIcon, 
    EyeOffIcon, 
    UserIcon, 
    ShieldIcon, 
    Chrome, 
    Apple, 
    FacebookIcon,
    Loader2Icon,
    GlobeIcon,
    BellIcon,
    QrCodeIcon
} from 'lucide-react';
import axios from 'axios';
import './styles/SignIn.css';
import './styles/shared.css';
import config from '../config';

const SignIn = () => {
    const navigate = useNavigate();
    const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'qr'
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('/api/auth/login', formData);
            
            if (response.data.requires2FA) {
                setIs2FAEnabled(true);
                setSuccess('Please enter your 2FA code');
                setIsLoading(false);
                return;
            }

            setSuccess('Login successful!');
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handle2FASubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('/api/auth/verify-2fa', {
                email: formData.email,
                code: twoFactorCode
            });

            setSuccess('Login successful!');
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || '2FA verification failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        setIsLoading(true);
        setError('');
        try {
            window.location.href = `/api/auth/${provider}`;
        } catch (err) {
            setError('Social login failed. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="signIn-container">


            <div className="signIn-form-container">
                <div className="signIn-form-wrapper">
                    <div className="signIn-welcome">
                        <h2>Welcome Back</h2>
                        <p>Sign in to continue to FutureXFinance</p>
                    </div>

                    <div className="signIn-method-toggle">
                        <button 
                            className={`method-button ${loginMethod === 'email' ? 'active' : ''}`}
                            onClick={() => setLoginMethod('email')}
                        >
                            <MailIcon size={18} />
                            Email
                        </button>
                        <button 
                            className={`method-button ${loginMethod === 'qr' ? 'active' : ''}`}
                            onClick={() => setLoginMethod('qr')}
                        >
                            <QrCodeIcon size={18} />
                            QR Code
                        </button>
                    </div>

                    {loginMethod === 'email' ? (
                        <form className="signIn-auth-form" onSubmit={is2FAEnabled ? handle2FASubmit : handleSubmit}>
                            {!is2FAEnabled ? (
                                <>
                                    <div className="signIn-form-group">
                                        <div className="signIn-input-wrapper">
                                            <MailIcon className="signIn-input-icon" />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="signIn-form-input"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="signIn-form-group">
                                        <div className="signIn-input-wrapper">
                                            <LockIcon className="signIn-input-icon" />
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                className="signIn-form-input"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Password"
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="signIn-password-toggle"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="signIn-options">
                                        <label className="signIn-remember-me">
                                            <input
                                                type="checkbox"
                                                name="rememberMe"
                                                checked={formData.rememberMe}
                                                onChange={handleChange}
                                            />
                                            <span>Remember me</span>
                                        </label>
                                        <Link to="/forgot-password" className="signIn-forgot-password">
                                            Forgot Password?
                                        </Link>
                                    </div>
                                    <button
                                        type="submit"
                                        className="signIn-submit-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2Icon className="loading-spinner" />
                                                Signing in...
                                            </>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </button>
                                </>
                            ) : (
                                <div className="signIn-form-group">
                                    <label htmlFor="2fa">Two-Factor Authentication</label>
                                    <div className="signIn-input-wrapper">
                                        <ShieldIcon className="signIn-input-icon" />
                                        <input
                                            type="text"
                                            id="2fa"
                                            className="signIn-form-input"
                                            value={twoFactorCode}
                                            onChange={(e) => setTwoFactorCode(e.target.value)}
                                            placeholder="Enter 2FA code"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="signIn-submit-button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2Icon className="loading-spinner" />
                                                Verifying...
                                            </>
                                        ) : (
                                            'Verify'
                                        )}
                                    </button>
                                </div>
                            )}

                            {error && <div className="signIn-error-message">{error}</div>}
                            {success && <div className="signIn-success-message">{success}</div>}

                            <div className="signIn-additional-options">
                                <div className="signIn-divider">
                                    <span>Or continue with</span>
                                </div>
                                <div className="signIn-social-buttons">
                                    <button
                                        type="button"
                                        className="signIn-social-button"
                                        onClick={() => handleSocialLogin('google')}
                                        disabled={isLoading}
                                    >
                                        <Chrome size={20} />
                                    </button>
                                    <button
                                        type="button"
                                        className="signIn-social-button"
                                        onClick={() => handleSocialLogin('apple')}
                                        disabled={isLoading}
                                    >
                                        <Apple size={20} />
                                    </button>
                                    <button
                                        type="button"
                                        className="signIn-social-button"
                                        onClick={() => handleSocialLogin('facebook')}
                                        disabled={isLoading}
                                    >
                                        <FacebookIcon size={20} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="signIn-qr-container">
                            <div className="qr-placeholder">
                                <QrCodeIcon size={120} />
                                <p>Scan with FutureXFinance mobile app</p>
                            </div>
                        </div>
                    )}

                    <div className="signIn-footer">
                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
