const mongoose = require("mongoose");

const JobData = new mongoose.Schema({
    companyname:String,
    position:String,
    contract:String,
    location:String
})



const JobModel = mongoose.model("job",JobData);
module.exports = JobModel