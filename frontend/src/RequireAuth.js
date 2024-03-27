import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireAuth = ({ children }) => {
    const { username } = useAuth();

    if (!username) {
        // User is not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    // User is logged in, allow access to the route
    return children;
};
