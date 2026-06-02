const mongoose=require("mongoose");

const applicationSchema=new mongoose.Schema({
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
        enum:["Applied","Accepted","Rejected"],
        default:"Applied"
    }
},{
    timestamps:true
});

module.exports=mongoose.model("Application",applicationSchema);