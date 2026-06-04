const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is required");
    }

    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        return mongoose.connection;
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        throw err;
    }
};

module.exports = connectDB;
