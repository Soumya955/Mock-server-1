const express = require("express");
const AuthModel = require("./auth.model");
const FlightModel = require("./flight.model");
const BookingModel = require("./Booking.model");

const app = express.Router();

// Resister Post Route
app.post("/register", async (req, res) => {
  try {
    let newUser = await AuthModel.create(req.body);
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login Post Route
app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let newUser = await AuthModel.findOne({ email, password });
    if (newUser) {
      res.send("Login Success");
    } else {
      res.send("Login Failure");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//   Add Flights to DB Using Post Route
app.post("/flights", async (req, res) => {
  try {
    let newFlight = await FlightModel.create(req.body);
    res.send(newFlight);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get All flights using get  Route
app.get("/flights", async (req, res) => {
  try {
    let Flights = await FlightModel.find();
    res.send(Flights);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a single flight using ID and get  Route
app.get("/flights/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let Flight = await FlightModel.findById(id);
    if (Flight) {
      res.send(Flight);
    } else {
      res.send("this Flight is not exists");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a single flight using ID and Patch  Route
app.patch("/flights/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let Flight = await FlightModel.findByIdAndUpdate(id, req.body);
    if (Flight) {
      res.send(Flight);
    } else {
      res.send("this Flight is not exists");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a single flight using ID and Delete  Route
app.delete("/flights/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let Flight = await FlightModel.findByIdAndDelete(id);
    if (Flight) {
      res.send("DELETED successfully");
    } else {
      res.send("this Flight is not exists");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Book a Flight using Post route and USERID of both Flight and User
app.post("/booking", async (req, res) => {
  try {
    let newBooking = await BookingModel.create(req.body);
    res.send(newBooking);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get All Booking using get  Route
app.get("/dashboard", async (req, res) => {
  try {
    let Bookings = await BookingModel.find();
    res.send(Bookings);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
