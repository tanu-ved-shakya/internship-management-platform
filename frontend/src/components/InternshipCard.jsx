import {Link} from "react-router-dom";

function InternshipCard({ internship }) {

    console.log("internship:", internship);
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
<Link
    to={`/apply/${internship._id}`}
    style={{
        backgroundColor:"#035dbc",
        color:"white",
        padding:"10px 20px",
        borderRadius:"5px",
        textDecoration:"none",
        display:"inline-block"
    }}
>
    Apply
</Link>
            </div>
        );
    }

export default InternshipCard;