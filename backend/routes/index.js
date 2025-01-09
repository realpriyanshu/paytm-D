const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const DbSchema = require("../Models/model.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const z = require("zod");
const { authMiddleware } = require("../middleware.js");

const validateZ = z.object({
  firstName: z.string().email(),
  lastName: z.string(),
  password: z.string(),
  username: z.string(),
});

const signInZ = z.object({
  username  : z.string().email(),
  password :  z.string()
})
const updateBody = z.object({
	password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})


Router.post("/create", async (req, res) => {
  const userPay = req.body;
  const resp = validateZ.safeParse(userPay);

  if (!resp.success) {
    return res.json({
      message: "Email already taken / Incorrect inputs",
    });
  }
  const existingUser = await DbSchema.findOne({
    username: resp.data.username,
  });

  if (existingUser) {
    res.json({
      msg: "user already exist",
    });
  }

  const user = {
    firstName: resp.data.firstName,
    lastName: resp.data.lastName,
    password: resp.data.password,
    username: resp.data.username,
  };
  const create = await DbSchema.create(user);
  const user_id = create._id;

  const token = jwt.sign(
    {
      user_id,
    },
    process.env.JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

Router.post("/signin" ,async(req,res)=>{
   


  const resp = signInZ.safeParse(req.body);

  const credentials = DbSchema.findOne({
    username : req.body.username,
    password : req.body.password
  })



  if(credentials){
   const token  = jwt.sign({
    user_id: credentials._id
   } , process.env.JWT_SECRET)

    res.json({
      msg:"loged In successfully",
      token : token
    })
 return
  }else{
    res.json({
      msg :"user doesn't exists"
    })
  }







})

Router.get("/", async (req, res) => {
  const users = await DbSchema.find();

  res.json(users);
});

Router.get('/bulk' , async(req,res)=>{
const filter = req.query.filter || "";

const users = await DbSchema.find({
  $or:[{
    firstName:{
      "$regex":filter
    }
  },{
    lastName:{
      "$regex":filter
    }
  }]
})

res.json({
  user :users.map(user=>({
    username:user.username,
    firstName:user.firstName,
    lastName:user.lastName,
    _id: user._id
  }))
})

})


Router.put("/edit",authMiddleware, async (req, res) => {
  const {success} = updateBody.safeParse(req.body); 

  if(!success){
    res.status(403).json({
      msg:"input errr"
    })
  }
  const { id } = req.params;
  const userPay = req.body;
  const resp = validateZ.safeParse(userPay);

  if (!resp.success) {
    return res.json({
      msg: "check your input",
    });
  }

  


  const result = await DbSchema.updateOne({id: req.userId}, req.body);

  res.json({
    msg:"updated successfully"
  })
});

module.exports = Router;
