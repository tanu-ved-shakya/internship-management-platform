import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/internships" className="navbar-logo">
                    InternPortal
                </Link>
                <div className="navbar-links">
                    <Link to="/internships" className="navbar-link">
                        Internships
                    </Link>
                    <Link to="/applications" className="navbar-link">
                        {user.role === "admin" ? "All Applications" : "My Applications"}
                    </Link>
                </div>
                <div className="navbar-user">
                    <span className="user-badge">
                        {user.name} ({user.role === "admin" ? "Admin" : "Student"})
                    </span>
                    <button onClick={logout} className="btn-logout">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
