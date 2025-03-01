import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/SignUp.css';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post('/api/auth/register', {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
            });

            if (response.status === 201) { // Successful registration
                alert('Registration successful!');
                navigate('/signin');
            } else if (response.status === 400) { // Bad Request
                setError(response.data.message || 'Registration failed. Please check your input.');
            } else { // Other errors (500, etc.)
                setError('An error occurred during registration. Please try again later.');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message || 'Bad request. Please check your input.');
            } else if (error.response && error.response.status === 500) {
                setError('Server error during registration. Please try again later.');
            } else {
                setError('An unexpected error occurred during registration.');
            }
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
                        </div>
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
                        <button type="submit" className="signUp-submit-button">
                            Sign Up
                        </button>
                    </form>
                    <div className="signUp-additional-options">
                        <a href="/signin" className="signUp-secondary-button">
                            <span>Already have an account?</span>
                            <span>Login</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
