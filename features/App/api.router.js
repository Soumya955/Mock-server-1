const express = require("express");
const bcrypt = require("bcrypt/bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./User.model");
const {ProductModel }= require("./product.model");


const app = express.Router();

app.post("/signup", async (req, res) => {
  const { name, email, phone, address, password } = req.body;
  console.log(name, email, phone, address, password )
  const user1 = await UserModel.findOne(email?{email}:{phone});
  console.log(user1)
  if (!user1) {
    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        res.send("Something went wrong");
      }
      const user = new UserModel({
        name,
        email,
        phone,
        address,
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
  const { email,phone, password } = req.body;
  const user = await UserModel.findOne(email?{email}:{phone});
  if(user){
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        res.send("Something went wrong");
      }
      if (result) {
        const token = jwt.sign({ userId: user._id }, "srb");
        res.json({ message: "Login Successfull", token,user });
      } else {
        res.send("Invalid Credentials");
      }
    });
  }else{
    res.send("Invalid Credentials");
  }
  
});

app.post("/product", async (req, res) => {
  try {
    let newProduct = await ProductModel.create(req.body);
    res.send(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/product/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let newProduct = await ProductModel.findByIdAndDelete(id);
    res.send("Deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.patch("/product/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    let newProduct = await ProductModel.findByIdAndUpdate(id,req.body);
    res.send(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/product", async (req, res) => {
  try {
    let data = await ProductModel.find();
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get("/product/:userId", async (req, res) => {
  let {userId}=req.params;
  try {
    let data = await ProductModel.find({"user._id":userId});
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



app.patch("/cart/:id", async (req, res) => {
  let {id}=req.params;
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
     id, req.body
    );
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});



// app.get("/product", async (req, res) => {
//   try {
//     let { location, contract } = req.query;
//     let data = await ProductModel.find(
//       location && contract
//         ? { location, contract }
//         : location
//         ? { location }
//         : contract
//         ? { contract }
//         : {}
//     );
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.get("/product/:name", async (req, res) => {
//   let { name } = req.params;
//   console.log(name);
//   try {
//     let { location, contract } = req.query;
//     console.log(name, location, contract);
//     let data = await ProductModel.find(
//       location && contract
//         ? { location, contract, companyname: name }
//         : location
//         ? { location, companyname: name }
//         : contract
//         ? { contract, companyname: name }
//         : { companyname: name }
//     );
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

module.exports = app;
