const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://aryanqt22:Atlas12345@cluster0.wshosx5.mongodb.net/devTinder"
    );
};

module.exports = connectDB;


