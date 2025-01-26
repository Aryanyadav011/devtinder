const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        //index:true,
        minLength:4,
        maxLength:50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowerCase:true,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address:" +value)
            }
        },
    },
    password: {
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a strong password:" +value)
            }
        },
    },
    age: {
        type: Number,
        min: 18,
      
    },
    gender: {
        type: String,
        enum:{
            values:["male","female","other"],
            message:`{VALUE} is not a valid gender type`,

        },
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new error("gender data in not valid")
        //     }
        // }
    },
    photoUrl: {
        type: String,
        default:"https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png",
          validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid photo  URL:" +value)
            }
        },
    },
    about: {
        type: String,
        default:"this is default value"
    },
    skills: {
        type: [String],
    },
    createdAt:{
        type:Date,
    }

},
{
    timestamps:true,
});

//User.find({firstName:"Yash",lastName:"Mishra"});

//userSchema.index({firstName:1, lastName:1})

userSchema.methods.getJWT = async function (){

    const user = this;
    const token = await jwt.sign({_id: user._id},"DEV@Tinder$790",{
        expiresIn : "7d"
    });
    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordValid;
};


module.exports=mongoose.model("User", userSchema);


