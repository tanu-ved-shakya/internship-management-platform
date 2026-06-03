const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret_key_67890";

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized. Please log in first." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user metadata to request object
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized. Invalid or expired token." });
    }
};

const isStudent = (req, res, next) => {
    if (req.user && req.user.role === 'student') {
        return next();
    }
    return res.status(403).json({ message: "Forbidden. Access restricted to students only." });
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return res.status(403).json({ message: "Forbidden. Access restricted to admins only." });
};

module.exports = {
    isAuthenticated,
    isStudent,
    isAdmin
};
