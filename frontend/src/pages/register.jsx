import{useState} from 'react';
import api from '../services/api';

function Register(){

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        role:"student"
    });

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await api.post('/register', formData);
            alert('Registration successful!');
            window.location.href="/";
        }catch(err){
            console.log(err.response?.data);
            alert(
                err.response?.data?.message || 'Registration failed'
            );
        }   
    };

    return(
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}   
                    onChange={handleChange}
                />
                <br />
                <input 
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <br />
                <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <br />
                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                </select>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>

    );
}

export default Register;
