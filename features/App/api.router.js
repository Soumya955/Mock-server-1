const express = require("express");
const bcrypt = require("bcrypt/bcrypt")
const jwt = require("jsonwebtoken");
const UserModel = require("./User.model");
const JobModel = require("./Job.model");


const app = express.Router();


app.post("/signup", (req, res) => {
  const {email, password} = req.body;
  bcrypt.hash(password, 5, async function(err, hash) {
      if(err){
          res.send("Something went wrong")
      }
      const user = new UserModel({
          email,
          password : hash
      })
      try{
          await user.save()
          res.json({msg : "Signup is successfull"})
      }
      catch(err){
          console.log(err)
          res.send("Something wrong")
      }
  });
})

app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const user = await UserModel.findOne({email})
  const hash = user.password
  bcrypt.compare(password, hash, function(err, result) {
      if(err){
          res.send("Something went wrong")
      }
      if(result){
          const token = jwt.sign({ userId : user._id }, "srb");
          res.json({message : "Login Successfull",token})
      }
      else{
          res.send("Invalid Credentials")
      }
  });
})

app.post("/job", async (req, res) => {
    try {
      let newJob = await JobModel.create(req.body);
      res.send(newJob);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete("/job/:id", async (req, res) => {
    let {id}=req.params;
    console.log(id)
    try {
      let newJob = await JobModel.findByIdAndDelete(id)
      res.send("Deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

 

  app.get("/job", async (req, res) => {
    try {
      let { location,contract } = req.query;
      let data = await JobModel.find((location&&contract)?{location,contract}:(location)?{location}:(contract)?{contract}:{})
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });


  
app.get("/job/:name", async (req, res) => {
    let {name}=req.params;
    console.log(name)
    try {
        let { location,contract } = req.query;
        console.log(name,location,contract)
      let data = await JobModel.find((location&&contract)?{location,contract,companyname:name}:(location)?{location,companyname:name}:(contract)?{contract,companyname:name}:{companyname:name})
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });









 module.exports = app;