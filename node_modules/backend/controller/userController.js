const User = require('../models/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key_67890";
const JWT_EXPIRES_IN = "1d";

// Shared cookie options — secure only on production (HTTPS)
const cookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000 // 1 day
});

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Build JWT payload
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        // Sign JWT and set it as an httpOnly cookie named "token"
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.cookie("token", token, cookieOptions());

        res.status(200).json({
            message: "User logged in successfully",
            user: payload
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in user", error: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        // req.user is populated by isAuthenticated middleware after JWT verification
        if (req.user) {
            return res.status(200).json({ user: req.user });
        }
        res.status(401).json({ message: "Not authenticated" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

const logoutUser = async (req, res) => {
    try {
        // Clear the JWT cookie
        res.clearCookie("token", cookieOptions());
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error during logout", error: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User profile retrieved successfully",
            user
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving user profile", error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logoutUser,
    getUserProfile
};