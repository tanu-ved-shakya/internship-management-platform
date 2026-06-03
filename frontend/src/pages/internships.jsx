import { useEffect, useState } from "react";
import api from "../services/api";
import InternshipCard from "../components/InternshipCard";
import { useAuth } from "../context/AuthContext";

function Internships() {
    const { user } = useAuth();
    const [internships, setInternships] = useState([]);
    const [appliedIds, setAppliedIds] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    // Form state for creating internships (admin only)
    const [showPostForm, setShowPostForm] = useState(false);
    const [newInternship, setNewInternship] = useState({
        title: "",
        description: "",
        location: "",
        stipend: "",
        duration: "",
        skillsRequired: ""
    });
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");

    const fetchData = async () => {
        setLoading(true);
        try {
            // Fetch internships
            const intResponse = await api.get("/internships");
            setInternships(intResponse.data);

            // If student, fetch applications to see what they have already applied to
            if (user && user.role === "student") {
                const appResponse = await api.get("/applications");
                const ids = new Set(
                    appResponse.data.map((app) => 
                        app.internshipId ? (app.internshipId._id || app.internshipId) : null
                    ).filter(Boolean)
                );
                setAppliedIds(ids);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [user]);

    const handleFormChange = (e) => {
        setNewInternship({
            ...newInternship,
            [e.target.name]: e.target.value
        });
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        setFormSuccess("");

        const { title, description, location, stipend, duration, skillsRequired } = newInternship;
        if (!title || !description || !location || !stipend || !duration || !skillsRequired) {
            setFormError("All fields are required.");
            return;
        }

        try {
            // Parse comma-separated skills into array
            const skillsArr = skillsRequired
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill.length > 0);

            await api.post("/internships", {
                ...newInternship,
                skillsRequired: skillsArr
            });

            setFormSuccess("Internship posted successfully!");
            setNewInternship({
                title: "",
                description: "",
                location: "",
                stipend: "",
                duration: "",
                skillsRequired: ""
            });
            setShowPostForm(false);
            
            // Reload internships
            fetchData();
        } catch (err) {
            setFormError(err.response?.data?.message || "Failed to post internship.");
        }
    };

    // Filter internships by search query
    const filteredInternships = internships.filter((item) => {
        const query = searchQuery.toLowerCase();
        const titleMatch = item.title?.toLowerCase().includes(query);
        const descMatch = item.description?.toLowerCase().includes(query);
        const locMatch = item.location?.toLowerCase().includes(query);
        const skillsMatch = item.skillsRequired?.some((skill) =>
            skill.toLowerCase().includes(query)
        );
        return titleMatch || descMatch || locMatch || skillsMatch;
    });

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Internships</h1>
                    <p className="page-subtitle">
                        {user?.role === "admin" 
                            ? "Manage posted internships or create new opportunities." 
                            : "Browse and apply for available internships."}
                    </p>
                </div>
                {user?.role === "admin" && (
                    <button
                        onClick={() => setShowPostForm(!showPostForm)}
                        className="btn-primary"
                    >
                        {showPostForm ? "Cancel Posting" : "Post Internship"}
                    </button>
                )}
            </div>

            {/* Admin Post Form */}
            {user?.role === "admin" && showPostForm && (
                <div className="card-form">
                    <h2 className="section-title">Post New Internship</h2>
                    {formError && <div className="error-message">{formError}</div>}
                    {formSuccess && <div className="success-message">{formSuccess}</div>}
                    
                    <form onSubmit={handlePostSubmit} className="grid-form">
                        <div className="form-group">
                            <label htmlFor="title">Job Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={newInternship.title}
                                onChange={handleFormChange}
                                placeholder="Software Engineer Intern"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <input
                                id="location"
                                type="text"
                                name="location"
                                value={newInternship.location}
                                onChange={handleFormChange}
                                placeholder="Remote / Pune, India"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="stipend">Stipend</label>
                            <input
                                id="stipend"
                                type="text"
                                name="stipend"
                                value={newInternship.stipend}
                                onChange={handleFormChange}
                                placeholder="₹20,000 / month"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="duration">Duration</label>
                            <input
                                id="duration"
                                type="text"
                                name="duration"
                                value={newInternship.duration}
                                onChange={handleFormChange}
                                placeholder="6 months"
                                required
                            />
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="skillsRequired">Skills Required (Comma separated)</label>
                            <input
                                id="skillsRequired"
                                type="text"
                                name="skillsRequired"
                                value={newInternship.skillsRequired}
                                onChange={handleFormChange}
                                placeholder="React, Node.js, MongoDB, JavaScript"
                                required
                            />
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="description">Job Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                value={newInternship.description}
                                onChange={handleFormChange}
                                placeholder="Detail the duties, requirements, and day-to-day tasks of this internship role."
                                required
                            ></textarea>
                        </div>
                        <div className="form-actions full-width">
                            <button type="submit" className="btn-primary">
                                Create Listing
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Search filter for students/general */}
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search by title, location, or skills (e.g. React)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            {loading ? (
                <div className="loading-state">Loading internships...</div>
            ) : filteredInternships.length > 0 ? (
                <div className="internships-grid">
                    {filteredInternships.map((internship) => (
                        <InternshipCard
                            key={internship._id}
                            internship={internship}
                            userRole={user?.role}
                            hasApplied={appliedIds.has(internship._id)}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>No internships found matching your query.</p>
                </div>
            )}
        </div>
    );
}

export default Internships;