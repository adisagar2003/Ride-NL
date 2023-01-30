const router = require("express").Router();
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const comparePassword = require('../utils/compare_password');
require('dotenv').config();

module.exports = {
  get: async (req, res) => {
    const data = await userModel.find({});

    res.status(200).json({
      data: data,
      response: "success",
    });
  },
  post: async (req, res) => {
    const userData = {
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      profileImage: req.file.path,
    };
    const newUser = new userModel(userData);
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
    try{
    const user = await userModel.findOne({ userName: req.body.userName });

    if (user) {
        const isPasswordSame  =await  comparePassword(req.body.password,user.password);
        
        console.log(isPasswordSame,'ISPASSWORD')
        if (isPasswordSame){
          const token = await jwt.sign({
            userId: user._id,
            userName: user.userName,
            ridesDriven: user.ridesDriven,
            email: user.email,
            profileImage: user.profileImage,
       
          },process.env.JWT_SECRET);

          res.cookie('access_token',token);
     
          res.setHeader('Authorization',`Bearer ${token}`)
          res.status(200).json({
            response:'true',
            data: {
              userId: user._id,
              userName: user.userName,
              ridesDriven: user.ridesDriven,
              email: user.email,
              profileImage: user.profileImage,
              token: token
            },
            token: token
          })
        }
      
    } else {
      throw new Error("User not found");
    }
  }catch(err){
    res.status(400).json({
        error: err.message
    })
  }
  },
};
