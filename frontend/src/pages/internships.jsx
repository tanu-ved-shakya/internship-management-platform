import {useEffect, useState} from 'react';
import api from '../services/api';
import InternshipCard from '../components/InternshipCard';

function Internships(){
    const [internships,setInternships]=useState([]);
    useEffect(()=>{
        const fetchInternships=async()=>{
            try{
                const response=await api.get("/internships");
                setInternships(response.data);
            }catch(err){
                console.error("Error fetching internships:",err);
            }   
        };
        fetchInternships();
    },[]);

    return(
        <div>
            <h1>Internships</h1>

                {internships.map((internship) => (
                    <InternshipCard key={internship._id} internship={internship} />
                ))}
                
            
        </div>
    );
}
export default Internships;