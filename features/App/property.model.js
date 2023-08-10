const mongoose = require("mongoose");

const propertyData = new mongoose.Schema({
    title:String,
    description:String,
    location:String,
    price:Number,
})



const propertyModel = mongoose.model("property",propertyData);
module.exports = propertyModel