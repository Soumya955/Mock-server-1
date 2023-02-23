const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: { type: String, ref: "User" },
  flight: { type: String, ref: "Flight" },
});

const BookingModel = mongoose.model("booking", BookingSchema);

module.exports = BookingModel;
