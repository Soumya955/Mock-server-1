const mongoose = require("mongoose");

const contactData = new mongoose.Schema({
    name:String,
    phone:Number,
    favorite:Boolean,
    userid:String,
})



const contactModel = mongoose.model("contact",contactData);
module.exports = contactModel