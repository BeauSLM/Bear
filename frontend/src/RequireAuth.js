import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireAuth = ({ children }) => {
    const auth = useAuth();

    if (!auth.user) {
        // Redirect to the login page if not logged in
        return <Navigate to="/login" replace />;
    }

    return children;
};


export default RequireAuth;