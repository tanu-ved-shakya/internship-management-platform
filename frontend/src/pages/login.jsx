import {useState} from "react";
import api from "../services/api";

function Login(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const response=await api.post("/login",{email,password});
            
            localStorage.setItem("user",JSON.stringify(response.data));
            alert("Login successful");

            window.location.href="/internships";
        }
        catch(err){
            console.error("Login failed:",err);
            alert("Login failed");
        }
    };

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <p>
    Don't have an account?

    <a href="/register">
        Sign Up
    </a>
</p>
        </div>
    );
}

export default Login;