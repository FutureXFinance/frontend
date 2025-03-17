import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './styles/SignIn.css';
import './styles/shared.css';
import { UserPlus } from 'lucide-react';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(`${API_URL}/login`, {
                email,
                password,
            });

            if (response.status === 200) {
                setSuccess('Login successful! Redirecting to dashboard...');
                localStorage.setItem('token', response.data.token);
                setTimeout(() => {
                    navigate('/dashboard');
                }, 1500);
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
                        {success && <div className="signIn-success-message">{success}</div>}
                        <button type="submit" className="signIn-submit-button">
                            Sign In
                        </button>
                    </form>
                    <div className="signIn-additional-options">
                        <Link to="/signup" className="signIn-secondary-button">
                            <span><UserPlus size={13} /></span>
                            <span>Don't have an account?</span>
                            <span>Register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
