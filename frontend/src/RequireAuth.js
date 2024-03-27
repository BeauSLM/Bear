import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RequireAuth = ({ children }) => {
    // const { username } = useAuth();
    const { user, setUser } = useAuth();

    console.log("Current Username: ", user);

    if (!user || user === "Guest") {
        return <Navigate to="/login" replace />;
    }

    return children;
};
export default RequireAuth;
