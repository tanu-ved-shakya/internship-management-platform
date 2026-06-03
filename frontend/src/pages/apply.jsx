import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

function Apply() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleApply = async () => {
        setSubmitting(true);
        setError("");
        try {
            await api.post("/applications", {
                internshipId: id
            });
            alert("Application submitted successfully!");
            navigate("/applications");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "An error occurred while submitting your application.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="page-container align-center">
            <div className="auth-card">
                <h1 className="auth-title">Confirm Application</h1>
                <p className="auth-subtitle">
                    Are you sure you want to apply for this internship? Your profile contact details will be shared with the recruiter.
                </p>
                {error && <div className="error-message">{error}</div>}
                <div className="form-actions row">
                    <button
                        onClick={handleApply}
                        disabled={submitting}
                        className="btn-primary"
                    >
                        {submitting ? "Submitting..." : "Yes, Confirm Application"}
                    </button>
                    <Link to="/internships" className="btn-secondary">
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Apply;