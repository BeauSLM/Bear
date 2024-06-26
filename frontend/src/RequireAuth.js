import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireAuth = ({ children }) => {
    const { user, setUser } = useAuth();

    console.log("Current Username: ", user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};
export default RequireAuth;
