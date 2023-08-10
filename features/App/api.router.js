const express = require("express");
const UserModel = require("./User.model");
const PropertyModel = require("./property.model");

const app = express.Router();



app.get("/srb", (req, res) => {
 
  res.send("hello soumya")

})

app.post("/signup", async(req, res) => {
  const {email,name, password} = req.body;
  const user = new UserModel({
    email,
    name,
    password ,
  })
   try{
    await user.save()
    res.json({msg : "Signup is successfull"})
   }
   catch(err){
    console.log(err)
    res.send("Something wrong")
   }
})

app.post("/login", async (req, res) => {
  const {email, password} = req.body;
  const user = await UserModel.findOne({email})
  if(user.password==password){
    res.json({message : "Login Successfull",user})
  }else{
    res.send("Invalid Credentials")
  }
})

app.post("/property", async (req, res) => {
    try {
      let newproperty = await PropertyModel.create(req.body);
      res.send(newproperty);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  
  app.get("/property", async (req, res) => {
    try {
      let data = await PropertyModel.find()
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  app.get("/property/:id", async (req, res) => {
    const {id}=req.params;
    try {
      let data = await PropertyModel.find({_id:id})
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.patch("/user/:id", async (req, res) => {
    try {
      let { id } = req.params;
      console.log(id)
      let data = await UserModel.findByIdAndUpdate(id,req.body)
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  app.get("/search/:search", async (req, res) => {
        try {
          let { search } = req.params;
          console.log(search)
          let data = await PropertyModel.find({$or:[{title:search},{location:search}]})
          res.send(data);
        } catch (error) {
          res.status(500).send(error.message);
        }
      });

  // app.delete("/contacts/:id", async (req, res) => {
  //   let {id}=req.params;
  //   try {
  //     let newJob = await ContactModel.findByIdAndDelete(id)
  //     res.send("Deleted");
  //   } catch (error) {
  //     res.status(500).send(error.message);
  //   }
  // });

 

  

//   app.get("/job", async (req, res) => {
//     try {
//       let { location,contract } = req.query;
//       let data = await JobModel.find((location&&contract)?{location,contract}:(location)?{location}:(contract)?{contract}:{})
//       res.send(data);
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   });
// axios react-loading react-loading-skeleton react-spinners sweetalert2


  
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