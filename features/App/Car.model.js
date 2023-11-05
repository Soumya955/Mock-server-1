const mongoose = require("mongoose");

const CarData = new mongoose.Schema({
  modelName:String,
  year:Number,
  listPrice: Number,
  colors:String,
  mileage: Number,
  power: Number,
  maxSpeed: Number,
  image:String,
  owner: {
    id: mongoose.Schema.Types.ObjectId,
    email: String,
    name: String,
    address: String,
    phone: String,
  },
});

const CarModel = mongoose.model("car", CarData);
module.exports = CarModel;
