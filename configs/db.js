const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  mongoose.set('strictQuery', false);
  return mongoose.connect(`mongodb+srv://Soumya:Soumya@cluster0.sgtoufm.mongodb.net/myfirstdb?retryWrites=true&w=majority`);
  
};

module.exports = connect;
