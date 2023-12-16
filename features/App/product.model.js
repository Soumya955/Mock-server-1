const mongoose = require("mongoose");

const userData = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  password: String,
});



const ProductData = new mongoose.Schema({
  image: String,
  description: String,
  quantity: String,
  weight: String,
  price: String,
  user:userData,
});

const ProductModel = mongoose.model("product", ProductData);
module.exports = { ProductModel, ProductData };
