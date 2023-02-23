const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
});

const AuthModel = mongoose.model("auth", authSchema);

module.exports = AuthModel;
