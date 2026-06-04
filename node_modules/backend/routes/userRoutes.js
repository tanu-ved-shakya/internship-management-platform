const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getMe,
    logoutUser,
    getUserProfile
} = require("../controller/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.post("/logout", logoutUser);
router.get("/profile/:id", getUserProfile);

module.exports = router;