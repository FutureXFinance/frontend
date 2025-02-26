import React, { useState } from 'react';
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa";
import { LuLogIn } from "react-icons/lu";
import './styles/LoginSignup.css';
import axios from 'axios';

const LoginSignup = () => {
const [isRegistering, setIsRegistering] = useState(false);
const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
});
const [error, setError] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    // Validate if registering
    if (isRegistering) {
    if (!formData.firstName || !formData.lastName) {
        setError('Please enter your first and last name.');
        return;
    }
    if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
    }
    }

    try {
    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
    const response = await axios.post(`http://localhost:5000${endpoint}`, {
        email: formData.email,
        password: formData.password,
        ...(isRegistering && {
        firstName: formData.firstName,
        lastName: formData.lastName,
        }),
        confirmPassword: formData.confirmPassword
    });

    // Handle successful login/registration
    console.log('Success:', response.data);
    // Example: Store token, redirect to dashboard, etc.
    } catch (err) {
    console.error('Error:', err.response?.data || err.message);
    // Handle errors (show error message to the user)
    setError(err.response?.data?.message || 'An error occurred.');
    }
};

const handleInputChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    });
};

const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setFormData({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
    });
    setError('');
};

return (
    <div className="login-container">
    <div className="login-form-container">
        <div className="form-wrapper">
        <div className="logo-container">
            <div className="logo-text">FutureXFinance</div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
            {isRegistering && (
            <div className="name-fields">
                <div className="form-group">
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                </div>
            </div>
            )}

            <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                placeholder='me@example.com'
            />
            </div>

            <div className="form-group">
            <label>Password</label>
            <input
                type="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleInputChange}
                placeholder=''
            />
            </div>

            {isRegistering && (
            <div className="form-group">
                <label>Confirm Password</label>
                <input
                type="password"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                />
            </div>
            )}
            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="submit-button">
            {isRegistering ? 'Create Account' : 'Login'}
            </button>
        </form>

        <div className="additional-options">
            {!isRegistering && (
            <button className="secondary-button">
                <RiLockPasswordFill />
                <span>I don't know my password</span>
                <FaAngleRight />
            </button>
            )}

            <button
            onClick={toggleForm}
            className="secondary-button"
            >
            {isRegistering ? <LuLogIn /> : <IoMdPersonAdd />}
            {isRegistering ? `Already have an account? Login` : `Register`}
            <FaAngleRight />
            </button>
        </div>
        </div>
    </div>
    </div>
);
};

export default LoginSignup;
