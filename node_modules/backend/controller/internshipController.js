const Internship=require("../models/internship");

const createInternship=async(req,res)=>{
    try{
        const internship=await Internship.create(req.body);

        res.status(201).json(internship);
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const getInternships= async(req,res)=>{
    try{
        const internships=await Internship.find();

        res.status(200).json(internships);
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

module.exports={
    createInternship,
    getInternships
};