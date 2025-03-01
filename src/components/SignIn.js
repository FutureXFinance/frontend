import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/api/auth/login', {
                email,
                password,
            });

            if (response.status === 200) { // Successful login
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            } else {
                setError(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError(error.response.data.message || 'Invalid credentials. Please try again.');
            } else if (error.response && error.response.status === 500) {
                setError('Server error during login. Please try again later.');
            } else {
                setError('An unexpected error occurred during login.');
            }
        }
    };

    return (
        <div className="signIn-container">
            <div className="signIn-form-container">
                <div className="signIn-form-wrapper">
                    <div className="signIn-logo-container">
                        <div className="signIn-logo-text">FutureXFinance</div>
                    </div>
                    <form className="signIn-auth-form" onSubmit={handleSubmit}>
                        <div className="signIn-form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="signIn-form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="me@example.com"
                                required
                            />
                        </div>
                        <div className="signIn-form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="signIn-form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder=""
                                required
                            />
                        </div>
                        {error && <div className="signIn-error-message">{error}</div>}
                        <button type="submit" className="signIn-submit-button">
                            Sign In
                        </button>
                    </form>
                    <div className="signIn-additional-options">
                        <a href="/signup" className="signIn-secondary-button">
                            <span>Don't have an account?</span>
                            <span>Register</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
