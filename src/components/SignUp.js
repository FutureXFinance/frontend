import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/SignUp.css';
import './styles/shared.css';
import { 
    MailIcon, 
    LockIcon, 
    EyeIcon, 
    EyeOffIcon, 
    UserIcon, 
    UserPlusIcon, 
    CheckIcon, 
    XIcon, 
    Chrome, 
    Apple,
    LockKeyholeIcon,
    Loader2Icon,
    GlobeIcon,
    BellIcon,
    ShieldCheckIcon,
    AlertCircleIcon
} from 'lucide-react';
import config from '../config';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [otpFields, setOtpFields] = useState(['', '', '', '', '', '']);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswordRules, setShowPasswordRules] = useState(false);
    const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const navigate = useNavigate();
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);
        
        try {
            const response = await axios.post(`${config.API_URL}/send-otp`, { 
                email: formData.email,
                type: 'registration'
            });
            
            if (response.status === 200) {
                setOtpSent(true);
                setError('');
                setSuccess('OTP has been sent to your email!');
            }
        } catch (error) {
            if (error.response?.status === 409) {
                setError('This email is already registered. Please sign in instead.');
            } else if (error.response?.status === 400) {
                setError(error.response.data.message || 'Invalid email address.');
            } else {
                setError(error.response?.data?.message || 'Error sending OTP. Please try again.');
            }
            setSuccess('');
        } finally {
            setIsLoading(false);
        }
    };

    const verifyOtp = async (otpValue) => {
        if (!formData.email || !otpValue || otpValue.length !== 6) {
            setIsOtpValid(false);
            return;
        }

        setIsVerifying(true);
        try {
            const response = await axios.post(`${config.API_URL}/verify-otp`, { 
                email: formData.email, 
                otp: otpValue,
                type: 'registration'
            });
            
            if (response.status === 200 && response.data.isValid) {
                setIsOtpValid(true);
                setIsEmailVerified(true);
                setError('');
                setSuccess('Email verified successfully!');
                otpRefs[5].current.focus();
            } else {
                setError(response.data.message || 'Invalid OTP.');
                setSuccess('');
                setIsOtpValid(false);
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error verifying OTP.');
            setSuccess('');
            setIsOtpValid(false);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleOtpChange = (index, value) => {
        const numValue = value.replace(/[^0-9]/g, '');
        if (numValue.length > 1) return;

        const newOtpFields = [...otpFields];
        newOtpFields[index] = numValue;
        setOtpFields(newOtpFields);

        if (numValue && index < 5) {
            otpRefs[index + 1].current.focus();
        }

        const combinedOtp = newOtpFields.join('');
        setOtp(combinedOtp);

        if (combinedOtp.length === 6) {
            verifyOtp(combinedOtp);
        } else {
            setIsOtpValid(false);
            setError('');
            setSuccess('');
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpFields[index] && index > 0) {
            otpRefs[index - 1].current.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
        const newOtpFields = [...otpFields];
        for (let i = 0; i < 6; i++) {
            newOtpFields[i] = pastedData[i] || '';
        }
        setOtpFields(newOtpFields);
        setOtp(pastedData);
        if (pastedData.length === 6) {
            verifyOtp(pastedData);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        if (!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        if (!isOtpValid) {
            setError('Please verify your email first.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${config.API_URL}/register`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                otp: otp.join('')
            });
            
            if (response.status === 201) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/signin');
                }, 2000);
            } else {
                setError(response.data.message || 'Registration failed.');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const validatePassword = (password) => {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        const isValid = hasMinLength && hasUpperCase && hasLowerCase && 
                       hasNumber && hasSpecialChar;
        setIsPasswordValid(isValid);
        return isValid;
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, password: value });
        validatePassword(value);
        setShowPasswordRules(true);
    };

    const handleConfirmPassword = (confirmPassword) => {
        setPasswordsMatch(confirmPassword === formData.password);
    };

    const handleGoogleSignUp = async () => {
        try {
            window.location.href = `${config.API_URL}/auth/google/signup`;
        } catch (error) {
            setError('Failed to connect with Google');
        }
    };

    const handleAppleSignUp = async () => {
        try {
            window.location.href = `${config.API_URL}/auth/apple/signup`;
        } catch (error) {
            setError('Failed to connect with Apple');
        }
    };

    const isOtpButtonDisabled = () => {
        return !formData.email || otpSent || isEmailVerified || isLoading;
    };

    const isFormValid = () => {
        return formData.firstName.trim() !== '' &&
               formData.lastName.trim() !== '' &&
               formData.email.trim() !== '' &&
               isOtpValid &&
               isPasswordValid &&
               passwordsMatch &&
               !isLoading;
    };

    return (
        <div className="signUp-container">
 
            <div className="signUp-form-container">
                <div className="signUp-form-wrapper">
                    <div className="signUp-logo-container">
                        <div className="signUp-logo-text">FutureXFinance</div>
                    </div>
                    <div className="signUp-security-banner">
                        <ShieldCheckIcon size={20} />
                        <span>Secure Registration Process</span>
                    </div>
                    <form className="signUp-auth-form" onSubmit={handleSubmit}>
                        <div className="signUp-name-fields">
                            <div className="signUp-form-group">
                                <label htmlFor="firstName">First Name</label>
                                <div className="signUp-input-wrapper">
                                    <UserIcon className="signUp-input-icon" />
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="signUp-form-input"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="signUp-form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <div className="signUp-input-wrapper">
                                    <UserIcon className="signUp-input-icon" />
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="signUp-form-input"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="signUp-form-group">
                            <label htmlFor="email">Email</label>
                            <div className="signUp-input-wrapper">
                                <MailIcon className="signUp-input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="signUp-form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    required
                                />
                                <button
                                    type="button"
                                    className="signUp-otp-button"
                                    disabled={isOtpButtonDisabled()}
                                    onClick={handleSendOtp}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2Icon className="loading-spinner" />
                                            Sending OTP...
                                        </>
                                    ) : (
                                        otpSent ? 'Resend' : 'Send OTP'
                                    )}
                                </button>
                            </div>
                        </div>
                        {otpSent && (
                            <div className="signUp-form-group">
                                <label htmlFor="otp">Enter OTP</label>
                                <div className="otp-input-container">
                                    {otpFields.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={otpRefs[index]}
                                            type="text"
                                            maxLength="1"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={handlePaste}
                                            className={`otp-input ${isOtpValid ? 'valid' : ''} ${error ? 'invalid' : ''}`}
                                            placeholder="0"
                                            required
                                        />
                                    ))}
                                    {otp.length === 6 && (
                                        <div className="otp-validation-icon">
                                            {isVerifying ? (
                                                <div className="loading-spinner"></div>
                                            ) : isOtpValid ? (
                                                <CheckIcon className="check-icon" />
                                            ) : (
                                                <XIcon className="cross-icon" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="signUp-form-group">
                            <label htmlFor="password">Password</label>
                            <div className="signUp-input-wrapper">
                                <LockIcon className="signUp-input-icon" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="signUp-form-input"
                                    value={formData.password}
                                    onChange={handlePasswordChange}
                                    onFocus={() => setShowPasswordRules(true)}
                                    onBlur={() => setShowPasswordRules(false)}
                                    placeholder="Password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="signUp-password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                </button>
                            </div>
                            {showPasswordRules && (
                                <div className="password-rules">
                                    <div className={`rule ${validatePassword(formData.password) ? 'valid' : ''}`}>
                                        <span>At least 8 characters</span>
                                    </div>
                                    <div className={`rule ${/[A-Z]/.test(formData.password) ? 'valid' : ''}`}>
                                        <span>One uppercase letter</span>
                                    </div>
                                    <div className={`rule ${/[a-z]/.test(formData.password) ? 'valid' : ''}`}>
                                        <span>One lowercase letter</span>
                                    </div>
                                    <div className={`rule ${/\d/.test(formData.password) ? 'valid' : ''}`}>
                                        <span>One number</span>
                                    </div>
                                    <div className={`rule ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'valid' : ''}`}>
                                        <span>One special character</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="signUp-form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="signUp-input-wrapper">
                                <LockIcon className="signUp-input-icon" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="signUp-form-input"
                                    value={formData.confirmPassword}
                                    onChange={(e) => {
                                        setFormData({ ...formData, confirmPassword: e.target.value });
                                        handleConfirmPassword(e.target.value);
                                    }}
                                    placeholder="Confirm Password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="signUp-password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="signUp-terms-section">
                            <label className="signUp-terms-checkbox">
                                <input
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    required
                                />
                                <span>I agree to the <button type="button" onClick={() => setShowTerms(true)}>Terms of Service</button> and <button type="button" onClick={() => setShowTerms(true)}>Privacy Policy</button></span>
                            </label>
                        </div>
                        {error && (
                            <div className="signUp-error-message">
                                <AlertCircleIcon size={16} />
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="signUp-success-message">
                                <CheckIcon size={16} />
                                {success}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="signUp-submit-button"
                            disabled={!isFormValid() || !acceptedTerms}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2Icon className="loading-spinner" />
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <UserPlusIcon />
                                    Create Account
                                </>
                            )}
                        </button>
                    </form>
                    <div className="signUp-additional-options">
                        <div className="signUp-divider">
                            <span>or continue with</span>
                        </div>
                        <div className="signUp-social-buttons">
                            <button
                                type="button"
                                className="signUp-social-button google"
                                onClick={handleGoogleSignUp}
                                disabled={isLoading}
                            >
                                <Chrome size={20} />
                                Continue with Google
                            </button>
                            <button
                                type="button"
                                className="signUp-social-button apple"
                                onClick={handleAppleSignUp}
                                disabled={isLoading}
                            >
                                <Apple size={20} />
                                Continue with Apple
                            </button>
                        </div>
                        <Link to="/signin" className="signUp-secondary-button">
                            <LockKeyholeIcon size={16} />
                            Already have an account? Sign In
                        </Link>
                    </div>
                </div>
            </div>
            {showTerms && (
                <div className="signUp-terms-modal">
                    <div className="signUp-terms-content">
                        <h2>Terms of Service</h2>
                        <div className="signUp-terms-text">
                            {/* Add your terms of service text here */}
                            <p>By using FutureXFinance, you agree to these terms...</p>
                        </div>
                        <button onClick={() => setShowTerms(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SignUp;