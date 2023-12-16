const mongoose = require("mongoose");
const { ProductData } = require("./product.model");

const userData = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  password: String,
  cart: [ProductData],
});

const UserModel = mongoose.model("user", userData);
module.exports = UserModel;
