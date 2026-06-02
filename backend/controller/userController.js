const User=require('../models/user');
const bcrypt=require("bcryptjs");

const registerUser=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        const existingUser=await User.findOne({
            email
        });
        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });
        res.status(201).json({
            message: "User registered successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message
        });
    }

};

const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        res.status(200).json({
            message: "User logged in successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error logging in user",
            error: error.message
        });
    }
};

const getUserProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User profile retrieved successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving user profile",
            error: error.message
        });
    }
};

module.exports={
    registerUser,
    loginUser,
    getUserProfile
};