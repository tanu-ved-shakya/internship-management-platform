console.log("Internship routes loaded");

const express= require("express");
const router=express.Router();

const{
    createInternship,
    getInternships
} = require("../controller/internshipController");

router.post("/internships",createInternship);
router.get("/internships",getInternships);


module.exports=router;