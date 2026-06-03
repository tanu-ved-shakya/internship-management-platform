import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { user, register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/internships", { replace: true });
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const { name, email, password, role } = formData;
        if (!name || !email || !password || !role) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            await register(name, email, password, role);
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Sign up to apply for or post internships.</p>
                
                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">I am a</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="student">Student (Applying for Internships)</option>
                            <option value="admin">Admin (Posting Internships)</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary">
                        Sign Up
                    </button>
                </form>
                <p className="auth-redirect">
                    Already have an account? <Link to="/">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
