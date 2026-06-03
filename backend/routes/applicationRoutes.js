const express = require('express');
const router = express.Router();

const {
    isAuthenticated,
    isStudent,
    isAdmin
} = require("../middleware/auth");

const {
    createApplication,
    getApplications,
    updateApplicationStatus
} = require("../controller/applicationController");

router.post("/applications", isAuthenticated, isStudent, createApplication);
router.get("/applications", isAuthenticated, getApplications);
router.patch("/applications/:id", isAuthenticated, isAdmin, updateApplicationStatus);
module.exports = router;