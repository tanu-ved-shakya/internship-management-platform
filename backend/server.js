require("dotenv").config();

const express=require("express");
const cors=require("cors");
const connectDB=require("./config/db");
const internshipRoutes=require("./routes/internshipRoutes");
const applicationRoutes=require("./routes/applicationRoutes");
const userRoutes=require("./routes/userRoutes");

const app=express();

connectDB();


app.use(cors());
app.use(express.json());

app.use("/api",internshipRoutes);
app.use("/api",applicationRoutes);
app.use("/api",userRoutes);
app.get("/",(req,res)=>{
    res.send("Internship Platform Backend running!!!!")
});

app.post("/api/check", (req, res) => {
    res.send("POST works");
});
const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})