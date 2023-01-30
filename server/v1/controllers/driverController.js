const router = require("express").Router();
const jwt = require("jsonwebtoken");
const driverModel = require("../models/driverModel");
const bcrypt = require('bcrypt');



module.exports = {
  get: async (req, res) => {
    const data = await driverModel.find(req.query);

    res.status(200).json({
      data: data,
      response: "success",
    });
  },
  post: async (req, res) => {
    const userData = {
      name: req.body.name,
      cabId: req.body.cabId,
      email: req.body.email,
      password: req.body.password,
      location:{
        type:'Point',
        coordinates:[req.body.longitude,req.body.latitude]
      },
      dob: new Date("2003-02-09"),
      profileImage:req.body.profileImage

    };
    const newUser = new driverModel(userData);
    const data = await newUser.save();
    res.status(200).json({
      response: "success",
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await userModel.findByIdAndUpdate(req.body);
    res.json({
      data: data,
      response: "success",
    });
  },
  delete: async (req, res) => {
    const data = await userModel.findByIdAndDelete(req.params.id);
    res.json({
      data: data,
      response: "success",
    });
  },
  login: async (req, res) => {
    const user = await userModel.findOne({ userName: req.body.userName });

    if (user) {
        const isPasswordSame =await comparePassword(user.password,req.body.password);
        
        console.log(isPasswordSame,'ISPASSWORD')
        if (isPasswordSame){
            res.status(200).json({
                response:'success',
                
            });
        }
        else{
            res.status(400).json({
                error:'Error'
            });
            
        }

      
    } else {
      throw new Error("User not found");
    }
  },
};

