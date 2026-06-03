import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await api.get("/me");
            setUser(response.data.user);
        } catch (err) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post("/login", { email, password });
            setUser(response.data.user);
            return response.data.user;
        } catch (err) {
            throw new Error(err.response?.data?.message || "Login failed");
        }
    };

    const logout = async () => {
        try {
            await api.post("/logout");
            setUser(null);
            window.location.href = "/";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const response = await api.post("/register", { name, email, password, role });
            return response.data;
        } catch (err) {
            throw new Error(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
