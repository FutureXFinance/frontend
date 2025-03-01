import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('token'); // Check for the token

    return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
