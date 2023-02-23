const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNo: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  seats: Number,
  price: Number,
});

const FlightModel = mongoose.model("flights", flightSchema);

module.exports = FlightModel;
