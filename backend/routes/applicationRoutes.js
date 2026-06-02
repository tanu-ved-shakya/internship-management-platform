const express = require('express');
const router = express.Router();

const{
    createApplication,
    getApplications,
    updateApplicationStatus
}=require("../controller/applicationController");

router.post("/applications", createApplication);
router.get("/applications", getApplications);
router.patch("/applications/:id", updateApplicationStatus);
module.exports = router;