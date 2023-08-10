const mongoose = require("mongoose");


const propertyData = new mongoose.Schema({
    title:String,
    description:String,
    location:String,
    price:Number,
})
const userData = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    bookings:[propertyData]
})

const UserModel = mongoose.model("user",userData);
module.exports = UserModel