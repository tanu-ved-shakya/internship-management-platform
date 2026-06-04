import { Link } from "react-router-dom";

function InternshipCard({ internship, userRole, hasApplied }) {
    return (
        <div className="internship-card">
            <div className="card-header">
                <h2 className="card-title">{internship.title}</h2>
                <span className="card-badge">{internship.location}</span>
            </div>
            <p className="card-desc">{internship.description}</p>
            <div className="card-details">
                <div>
                    <strong>Stipend:</strong> {internship.stipend}
                </div>
                <div>
                    <strong>Duration:</strong> {internship.duration}
                </div>
                {internship.skillsRequired && internship.skillsRequired.length > 0 && (
                    <div className="card-skills">
                        <strong>Skills:</strong>{" "}
                        {internship.skillsRequired.map((skill, idx) => (
                            <span key={idx} className="skill-tag">
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {userRole === "student" && (
                <div className="card-actions">
                    {hasApplied ? (
                        <span className="status-badge status-applied">Applied</span>
                    ) : (
                        <Link to={`/apply/${internship._id}`} className="btn-primary-sm">
                            Apply
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default InternshipCard;