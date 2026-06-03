const mongoose=require("mongoose");

const applicationSchema=new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    studentName:{
        type:String,
        required:true
    },
    studentEmail:{
        type:String,
        required:true
    },
    internshipId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Internship",
        required:true
    },
    status:{
        type:String,
        enum:["Applied","Shortlisted","Rejected"],
        default:"Applied"
    }
},{
    timestamps:true
});

module.exports=mongoose.model("Application",applicationSchema);