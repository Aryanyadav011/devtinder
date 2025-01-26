const express = require("express");
//const User = require("./models/user");
const jwt = require("jsonwebtoken")
const {userAuth}=require("../middlewares/auth")
const profileRouter = express.Router();
const {validateEditProfileData}= require("../utils/validation");

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const cookies = req.cookies;

    const{token} = cookies;
    if(!token){
        throw new Error("invalid Token");
    }
    const decodedMessage = await jwt.verify(token,"DEV@Tinder$790");

    const { _id } = decodedMessage;
    //console.log("Logged in user is:" + _id);

    const user = req.user;
    res.send(user);
    
}catch(err){
    res.status(400).send("Error:"+err.message)

}

});
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
    if(!validateEditProfileData(req)){

        
        throw new Error("invalid edit request");

    } 
    
    const loggedInUser = req.user;
    

    Object.keys(req.body).forEach((key)=> (loggedInUser[key]=req.body[key]));

    await loggedInUser.save();
   

    res.json({
      message:`${loggedInUser.firstName},your profile updated successfully!!`,
      data:loggedInUser,
    });
    
  }catch(err){
    res.status(400).send("ERROR:"+ err.message);
  }

})

module.exports = profileRouter;