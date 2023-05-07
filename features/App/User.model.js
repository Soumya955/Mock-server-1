const mongoose = require("mongoose");

const userData = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const UserModel = mongoose.model("user",userData);
module.exports = UserModel