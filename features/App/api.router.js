const express = require("express");
const bcrypt = require("bcrypt/bcrypt")
const jwt = require("jsonwebtoken");
const UserModel = require("./User.model");
const ContactModel = require("./contact.model");

const app = express.Router();



app.get("/srb", (req, res) => {
 
  res.send("hello soumya")

})

app.post("/signup", (req, res) => {
  const {email,name, password} = req.body;
  bcrypt.hash(password, 5, async function(err, hash) {
      if(err){
          res.send("Something went wrong")
      }
      const user = new UserModel({
          email,
          name,
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
          res.json({message : "Login Successfull",token,user})
      }
      else{
          res.send("Invalid Credentials")
      }
  });
})

app.post("/contacts", async (req, res) => {
    try {
      let newcontact = await ContactModel.create(req.body);
      res.send(newcontact);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  
  app.get("/contacts/:userid", async (req, res) => {
    try {
      let { userid } = req.params;
      let data = await ContactModel.find({userid:userid})
     // console.log(userid,data,"ll")
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.patch("/contacts/:id", async (req, res) => {
    try {
      let { id } = req.params;
      console.log(id)
      let data = await ContactModel.findByIdAndUpdate(id,req.body)
      console.log(data)
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.delete("/contacts/:id", async (req, res) => {
    let {id}=req.params;
    try {
      let newJob = await ContactModel.findByIdAndDelete(id)
      res.send("Deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

 

  

//   app.get("/job", async (req, res) => {
//     try {
//       let { location,contract } = req.query;
//       let data = await JobModel.find((location&&contract)?{location,contract}:(location)?{location}:(contract)?{contract}:{})
//       res.send(data);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   });


  
// app.get("/job/:name", async (req, res) => {
//     let {name}=req.params;
//     console.log(name)
//     try {
//         let { location,contract } = req.query;
//         console.log(name,location,contract)
//       let data = await JobModel.find((location&&contract)?{location,contract,companyname:name}:(location)?{location,companyname:name}:(contract)?{contract,companyname:name}:{companyname:name})
//       res.send(data);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   });







 module.exports = app;