import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL ||
    (import.meta.env.PROD ? "https://internship-management-platform-backend-onniwgf33.vercel.app/api" : "http://localhost:5000/api");

const api = axios.create({
    baseURL,
    withCredentials: true
});

export default api;
