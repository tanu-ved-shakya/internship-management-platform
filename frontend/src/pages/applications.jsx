import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Applications() {
    const { user } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await api.get("/applications");
            setApplications(response.data);
        } catch (err) {
            console.error("Error fetching applications:", err);
            setError("Failed to load applications. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            const response = await api.patch(`/applications/${id}`, {
                status: newStatus
            });
            // Update applications list in state directly
            setApplications(
                applications.map((app) => (app._id === id ? response.data : app))
            );
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update application status.");
        }
    };

    if (loading) {
        return <div className="loading-state">Loading applications...</div>;
    }

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Applications</h1>
                    <p className="page-subtitle">
                        {user?.role === "admin"
                            ? "Review and update applicant statuses."
                            : "Track the status of your internship applications."}
                    </p>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {applications.length > 0 ? (
                <div className="applications-list">
                    {applications.map((application) => {
                        const internship = application.internshipId || {
                            title: "Deleted Internship Listing",
                            location: "N/A",
                            stipend: "N/A"
                        };

                        const statusClass = 
                            application.status === "Shortlisted" 
                                ? "status-shortlisted" 
                                : application.status === "Rejected" 
                                ? "status-rejected" 
                                : "status-applied";

                        return (
                            <div key={application._id} className="application-card">
                                <div className="app-card-header">
                                    <div>
                                        <h3 className="app-title">{internship.title}</h3>
                                        <p className="app-meta">
                                            Location: {internship.location} | Stipend: {internship.stipend}
                                        </p>
                                    </div>
                                    <span className={`status-badge ${statusClass}`}>
                                        {application.status}
                                    </span>
                                </div>

                                {user?.role === "admin" && (
                                    <div className="app-card-candidate">
                                        <h4 className="candidate-title">Applicant Details</h4>
                                        <div className="candidate-info">
                                            <div><strong>Name:</strong> {application.studentName}</div>
                                            <div><strong>Email:</strong> {application.studentEmail}</div>
                                            <div>
                                                <strong>Applied On:</strong>{" "}
                                                {new Date(application.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {application.status === "Applied" && (
                                            <div className="app-card-actions">
                                                <button
                                                    onClick={() => handleUpdateStatus(application._id, "Shortlisted")}
                                                    className="btn-success-sm"
                                                >
                                                    Shortlist
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(application._id, "Rejected")}
                                                    className="btn-danger-sm"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="empty-state">
                    <p>No applications found.</p>
                </div>
            )}
        </div>
    );
}

export default Applications;