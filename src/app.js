
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");



app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);








// app.get("/user",async(req,res) =>{
//     const userEmail = req.body.emailId;

//     try{
//         const user = await User.findOne({emailId: userEmail});
//         if(!user){
//             res.status(400).send("user not found")
//         }else{
//         res.send(user);
//         }
//         // if(users.length === 0){
//         //     res.status(400).send("user not found")

//         // }else{
//         // res.send(users);
//         // }
//     }catch(err){
//         res.status(400).send("something went wrong")

//     }

// });

// app.get("/feed",async(req,res) =>{
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }catch(err){
//         res.status(400).send("something went wrong")

//     }

// });

// app.delete("/user",async(req,res)=>{
//     const userId = req.body.userId;
//     try{
//         const user = await User.findByIdAndDelete(userId);

//         res.send("user deleted successfully");
//     }catch(err){
//         res.status(400).send("something went wrong");
//     }
// });

// app.patch("/user/:userId",async(req,res)=>{
//     const userId = req.params?.userId;
//     const data = req.body;

  


//     try{
//         const ALLOWED_UPDATES = ["photoUrl","about","gender","age","userId","skills"];
//         const isUpdateAllowed = Object.keys(data).every((k)=>
//         ALLOWED_UPDATES.includes(k));
//         if(!isUpdateAllowed){
//             throw new Error("update not allowed");
//         }
//         if(data?.skills.length>10){
//             throw new Error("skills can not be more than 10");
//         }


//          const user = await User.findByIdAndUpdate({ _id:userId},data,{
//             returnDocument:"after",
//             runValidators:"true,"
//          });

//         res.send("user update successfully");
//     }catch(err){
//         res.status(400).send("Updated failed:"+ err.message);
//     }
// });




connectDB()
.then(() =>{
    console.log("database connection establish");

    app.listen(3000, ()=>{
        console.log("server is successfully listening on port 3000");
        
    });
})
.catch((err) => {
    console.error("database can not be connected")
});



