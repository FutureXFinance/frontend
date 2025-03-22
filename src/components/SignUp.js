import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/SignUp.css';
import './styles/shared.css';
import { LockKeyhole, Check, X } from 'lucide-react';
import config from '../config';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpValid, setIsOtpValid] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [otpFields, setOtpFields] = useState(['', '', '', '', '', '']);
    const [showPasswordRules, setShowPasswordRules] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            console.log('Attempting to send OTP to:', formData.email);
            console.log('Using API URL:', config.API_URL);
            
            const response = await axios.post(`${config.API_URL}/send-otp`, { email: formData.email });
            console.log('OTP Response:', response);
            
            if (response.status === 200) {
                setOtpSent(true);
                setError('');
                setSuccess('OTP has been sent to your email!');
            }
        } catch (error) {
            console.error('OTP Send Error:', error);
            // Handle specific error cases
            if (error.response?.status === 409) {
                setError('This email is already registered. Please sign in instead.');
            } else if (error.response?.status === 400) {
                setError(error.response.data.message || 'Invalid email address.');
            } else {
                setError(error.response?.data?.message || 'Error sending OTP. Please try again.');
            }
            setSuccess('');
        }
    };

    const verifyOtp = async (otpValue) => {
        if (!formData.email || !otpValue || otpValue.length !== 6) {
            setIsOtpValid(false);
            return;
        }

        setIsVerifying(true);
        try {
            const response = await axios.post(`${config.API_URL}/verify-otp`, { email: formData.email, otp: otpValue });
            
            if (response.status === 200 && response.data.isValid) {
                setIsOtpValid(true);
                setError('');
                setSuccess('OTP verified successfully!');
                // Focus the last OTP input to show the check mark
                otpRefs[5].current.focus();
            } else {
                setError(response.data.message || 'Invalid OTP.');
                setSuccess('');
                setIsOtpValid(false);
            }
        } catch (error) {
            console.error('OTP Verification Error:', error);
            setError(error.response?.data?.message || 'Error verifying OTP.');
            setSuccess('');
            setIsOtpValid(false);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleOtpChange = (index, value) => {
        // Only allow numbers
        const numValue = value.replace(/[^0-9]/g, '');
        if (numValue.length > 1) return; // Prevent multiple digits

        const newOtpFields = [...otpFields];
        newOtpFields[index] = numValue;
        setOtpFields(newOtpFields);

        // Auto-focus next input
        if (numValue && index < 5) {
            otpRefs[index + 1].current.focus();
        }

        // Combine all fields for verification
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
        // Handle backspace
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
        
        // Validate password before proceeding
        if (!formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!isOtpValid) {
            setError('Please enter a valid OTP.');
            return;
        }

        try {
            console.log('Attempting registration with:', { ...formData });
            const response = await axios.post(`${config.API_URL}/register`, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
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
            console.error('Registration Error:', error);
            setError(error.response?.data?.message || 'An unexpected error occurred.');
        }
    };

    // Add password validation function
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

    // Update password handler
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setFormData({ ...formData, password: value });
        validatePassword(value);
    };

    // Handle password confirmation
    const handleConfirmPassword = (confirmPassword) => {
        setPasswordsMatch(confirmPassword === formData.password);
    };

    // Handle OTP button state
    const isOtpButtonDisabled = () => {
        return !formData.email || otpSent || isEmailVerified;
    };

    // Check if form is valid
    const isFormValid = () => {
        return formData.firstName.trim() !== '' &&
               formData.lastName.trim() !== '' &&
               formData.email.trim() !== '' &&
               isOtpValid &&
               isPasswordValid &&
               passwordsMatch;
    };

    return (
        <div className="signUp-container">
            <div className="signUp-form-container">
                <div className="signUp-form-wrapper">
                    <div className="signUp-logo-container">
                        <div className="signUp-logo-text">FutureXFinance</div>
                    </div>
                    <form className="signUp-auth-form" onSubmit={handleSubmit}>
                        <div className="signUp-name-fields">
                            <div className="signUp-form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="signUp-form-input"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    placeholder="John"
                                    required
                                />
                            </div>
                            <div className="signUp-form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="signUp-form-input"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    placeholder="Doe"
                                    required
                                />
                            </div>
                        </div>
                        <div className="signUp-form-group">
                            <label htmlFor="email">Email</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="signUp-form-input"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="me@example.com"
                                    required
                                />
                                <button
                                    type="button"
                                    className="signUp-otp-button"
                                    disabled={isOtpButtonDisabled()}
                                    onClick={handleSendOtp}
                                >
                                    {otpSent ? 'Resend' : 'OTP'}
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
                                                <Check className="check-icon" />
                                            ) : (
                                                <X className="cross-icon" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="signUp-form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="signUp-form-input"
                                value={formData.password}
                                onChange={handlePasswordChange}
                                onFocus={() => setShowPasswordRules(true)}
                                placeholder=""
                                required
                            />
                            {showPasswordRules && (
                                <div className="password-rules">
                                    <div className={`rule ${isPasswordValid ? 'valid' : ''}`}>
                                        {isPasswordValid ? 
                                            <Check size={12} className="check-icon" /> : 
                                            <X size={12} className="cross-icon" />
                                        }
                                        <span>At least 8 characters</span>
                                    </div>
                                    <div className={`rule ${isPasswordValid ? 'valid' : ''}`}>
                                        {isPasswordValid ? 
                                            <Check size={12} className="check-icon" /> : 
                                            <X size={12} className="cross-icon" />
                                        }
                                        <span>One uppercase letter</span>
                                    </div>
                                    <div className={`rule ${isPasswordValid ? 'valid' : ''}`}>
                                        {isPasswordValid ? 
                                            <Check size={12} className="check-icon" /> : 
                                            <X size={12} className="cross-icon" />
                                        }
                                        <span>One lowercase letter</span>
                                    </div>
                                    <div className={`rule ${isPasswordValid ? 'valid' : ''}`}>
                                        {isPasswordValid ? 
                                            <Check size={12} className="check-icon" /> : 
                                            <X size={12} className="cross-icon" />
                                        }
                                        <span>One number</span>
                                    </div>
                                    <div className={`rule ${isPasswordValid ? 'valid' : ''}`}>
                                        {isPasswordValid ? 
                                            <Check size={12} className="check-icon" /> : 
                                            <X size={12} className="cross-icon" />
                                        }
                                        <span>One special character</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="signUp-form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="signUp-form-input"
                                value={formData.confirmPassword}
                                onChange={(e) => {
                                    setFormData({ ...formData, confirmPassword: e.target.value });
                                    handleConfirmPassword(e.target.value);
                                }}
                                placeholder=""
                                required
                            />
                        </div>
                        {error && <div className="signUp-error-message">{error}</div>}
                        {success && <div className="signUp-success-message">{success}</div>}
                        <button
                            type="submit"
                            className="signUp-submit-button"
                            disabled={!isFormValid()}
                        >
                            Sign Up
                        </button>
                    </form>
                    <div className="signUp-additional-options">
                        <Link to="/signin" className="signUp-secondary-button">
                            <span><LockKeyhole size={13} /></span>
                            <span>Already have an account?</span>
                            <span>Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;