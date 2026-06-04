console.log("Internship routes loaded");

const express= require("express");
const router=express.Router();

const {
    isAuthenticated,
    isAdmin
} = require("../middleware/auth");

const {
    createInternship,
    getInternships
} = require("../controller/internshipController");

router.post("/internships", isAuthenticated, isAdmin, createInternship);
router.get("/internships", isAuthenticated, getInternships);


module.exports=router;