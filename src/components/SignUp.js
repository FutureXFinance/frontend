import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './styles/SignUp.css';
import './styles/shared.css';
import { LockKeyhole } from 'lucide-react';
import config from '../config';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpInputVisible, setOtpInputVisible] = useState(false);
    const [isOtpValid, setIsOtpValid] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            console.log('Attempting to send OTP to:', email);
            console.log('Using API URL:', config.API_URL);
            
            const response = await axios.post(`${config.API_URL}/send-otp`, { email });
            console.log('OTP Response:', response);
            
            if (response.status === 200) {
                setOtpSent(true);
                setOtpInputVisible(true);
                setError('');
                setSuccess('OTP has been sent to your email!');
            }
        } catch (error) {
            console.error('OTP Send Error:', error);
            setError(error.response?.data?.message || 'Error sending OTP. Please try again.');
            setSuccess('');
        }
    };

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        try {
            if (!email || !otp) {
                setError('Both email and OTP are required.');
                setSuccess('');
                return;
            }

            console.log('Verifying OTP:', { email, otp });
            const response = await axios.post(`${config.API_URL}/verify-otp`, { email, otp });
            
            if (response.status === 200 && response.data.isValid) {
                setIsOtpValid(true);
                setError('');
                setSuccess('OTP verified successfully!');
            } else {
                setError(response.data.message || 'Invalid OTP.');
                setSuccess('');
                setIsOtpValid(false);
            }
        } catch (error) {
            console.error('OTP Verification Error:', error);
            setError(error.response?.data?.message || 'Error verifying OTP.');
            setSuccess('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!isOtpValid) {
            setError('Please verify your OTP first.');
            return;
        }

        try {
            console.log('Attempting registration with:', { firstName, lastName, email });
            const response = await axios.post(`${config.API_URL}/register`, {
                firstName,
                lastName,
                email,
                password,
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
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
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
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="me@example.com"
                                    required
                                />
                                {!otpSent && (
                                    <button className="signUp-otp-button" onClick={handleSendOtp}>OTP</button>
                                )}
                            </div>
                        </div>
                        {otpSent && (
                            <div className="signUp-form-group">
                                <label htmlFor="otp">Enter OTP</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        id="otp"
                                        name="otp"
                                        className="signUp-form-input"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder="Enter OTP"
                                        required
                                    />
                                    <button className='signUp-verify-button' onClick={handleOtpVerify}>Verify</button> 
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="signUp-form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="signUp-form-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder=""
                                required
                            />
                        </div>
                        {error && <div className="signUp-error-message">{error}</div>}
                        {success && <div className="signUp-success-message">{success}</div>}
                        <button type="submit" className="signUp-submit-button">
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
