import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading application...</p>
            </div>
        );
    }

    if (!user) {
        // Not logged in, redirect to login
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Role not permitted, redirect to internships list
        return <Navigate to="/internships" replace />;
    }

    return children;
}

export default ProtectedRoute;
