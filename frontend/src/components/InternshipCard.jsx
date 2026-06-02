import {Link} from "react-router-dom";

function InternshipCard({ internship }) {
    return (
        <div
            style={{
                border:"1px solid gray",
                padding:"15px",
                margin:"15px",
                borderRadius:"10px",
                boxShadow:"0 4px 8px rgba(0,0,0,0.1)"

            }}
            >
                <h2>{internship.title}</h2>
                <p>{internship.description}</p>
                <p><strong>Location:</strong> {internship.location}</p>
                <p><strong>Stipend:</strong> {internship.stipend}</p>
                <p><strong>Duration:</strong> {internship.duration}</p>
                <p><strong>Skills Required:</strong> {internship.skillsRequired.join(", ")}</p>
                <button style={{
                    backgroundColor:"#035dbc",
                    color:"white",
                    border:"none",
                    padding:"10px 20px",
                    borderRadius:"5px",
                    cursor:"pointer"
                }}>
                    <Link to={`/apply/${internship.id}`} style={{ color: "white", textDecoration: "none" }}>
                        Apply
                    </Link>
                </button>
            </div>
        );
    }

export default InternshipCard;