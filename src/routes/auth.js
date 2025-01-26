const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
//const validatePassword = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
//  const jwt = require("jsonwebtoken")



authRouter.post("/signup",async(req,res) => {
    try{

    //validation of data
    validateSignUpData(req);
    const{firstName,lastName,emailId,password}= req.body;

    //encrypt password
    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);
    



  const user =new User ({
    firstName,
    lastName,
    emailId,
    password: passwordHash,
  });
    

   
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
            
            res.cookie("token",token,{
                expires: new Date(Date.now()+ 8 *3600000 ),
            });


    res.json({message:"user added successfully",data:savedUser});
}catch(err){
    res.status(400).send("Error occurs:"+err.message);
}
});
authRouter.post("/login",async(req,res)=>{ 
    try{
        //validatePassword(req);
        const{emailId,password}=req.body;

        const user = await User.findOne({emailId:emailId});
        if(!user){
            throw new Error("Invalid credentials");
            
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){

            const token = await user.getJWT();
            
            res.cookie("token",token,{
                expires: new Date(Date.now()+ 8 *3600000 ),
            });



            res.send(user)
        }else{
            throw new Error("Invalid credentials");
        }


    }catch(err){
        res.status(400).send("Error:"+ err.message);
    }
});
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    });
    res.send("Logout successfull!!!!");
})

module.exports = authRouter;