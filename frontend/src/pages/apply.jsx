import { useParams } from "react-router-dom";
import api from "../services/api";

function Apply(){
    const {id}=useParams();

    const handleApply=async()=>{
        try{
            const user=JSON.parse(localStorage.getItem("user"));

            console.log("USER:", user);
            console.log("ID:", id);
            await api.post("/applications",{
                studentName:user.name,
                studentEmail:user.email,
                internshipId:id
            });
            alert("Application submitted successfully");
        }catch(err){
    console.log(err.response.data);
    console.error(err);
}
    };

    return(
        <div>
            <h1>Apply for Internship</h1>
            <button onClick={handleApply}>Confirm Apply</button>
        </div>
    );
}

export default Apply;