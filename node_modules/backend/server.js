require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");

const internshipRoutes = require("./routes/internshipRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Trust reverse proxy for HTTPS cookie delivery on Vercel
app.set("trust proxy", 1);

// Connect to MongoDB
connectDB();

// CORS configuration supporting dynamic production allowed origin
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Body and Cookie parsers
app.use(express.json());
app.use(cookieParser());

// Apply request logger after cookie parser
app.use(logger);

// Setup Routes
app.use("/api", internshipRoutes);
app.use("/api", applicationRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
    res.send("Internship Platform Backend running!!!!");
});

app.post("/api/check", (req, res) => {
    res.send("POST works");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});