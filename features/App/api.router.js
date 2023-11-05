const express = require("express");
const bcrypt = require("bcrypt/bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./User.model");
const CarModel = require("./Car.model");

const app = express.Router();

app.get("/", async (req, res) => {
    res.send('working');
});

app.post("/signup", async (req, res) => {
  const { email, password, name, address, phone } = req.body;
  const user1 = await UserModel.findOne({ email });
  if (!user1) {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.send("Something went wrong");
      }
      const user = new UserModel({
        email,
        name,
        address,
        phone,
        password: hash,
      });
      try {
        await user.save();
        res.send("Signup is successfull");
      } catch (err) {
        console.log(err);
        res.send("Something went wrong");
      }
    });
  } else {
    res.send("Email is already Exists");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send("Something went wrong");
    }
    if (result) {
      const token = jwt.sign({ userId: user._id }, "srb");
      res.json({ message: "Login Successfull", token, user });
    } else {
      res.send("Invalid Credentials");
    }
  });
});

app.post("/Car", async (req, res) => {
  try {
    let newCar = await CarModel.create(req.body);
    res.send(newCar);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/Car", async (req, res) => {
  let { userId } = req.params;
  let { color, price, mileage } = req.query;
  let [price1, price2] = price.split("-");
  let [mileage1, mileage2] = mileage.split("-");
  try {
    let data = await CarModel.find(
      color && price && mileage
        ? {
            colors: color,
            listPrice: { $gte: price1, $lte: price2 },
            mileage: { $gte: mileage1, $lte: mileage2 },
          }
        : color && mileage
        ? { colors: color, mileage: { $gte: mileage1, $lte: mileage2 } }
        : price && mileage
        ? {
            listPrice: { $gte: price1, $lte: price2 },
            mileage: { $gte: mileage1, $lte: mileage2 },
          }
        : price && color
        ? { colors: color, listPrice: { $gte: price1, $lte: price2 } }
        : color
        ? { colors: color }
        : price
        ? { listPrice: { $gte: price1, $lte: price2 } }
        : mileage
        ? { mileage: { $gte: mileage1, $lte: mileage2 } }
        : {}
    );
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/Car/:userId", async (req, res) => {
  let { userId } = req.params;
  // console.log(userId)
  try {
    let data = await CarModel.find({ "owner.id": userId });
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.patch("/Car/:carId", async (req, res) => {
  let { carId } = req.params;
  try {
    let data = await CarModel.findByIdAndUpdate(carId, req.body);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/Car/:carId", async (req, res) => {
  let { carId } = req.params;
  try {
    let newCar = await CarModel.findByIdAndDelete(carId);
    res.send("Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = app;
