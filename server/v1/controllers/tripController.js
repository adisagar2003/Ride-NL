
const jwt = require('jsonwebtoken');
const nearestDrivers = require('../utils/find_nearest_drivers');
const driverModel = require('../models/driverModel');
module.exports = {
        findDrivers : async (req,res)=>{
        try{
           data = await nearestDrivers([req.body.longitude, req.body.latitude]);
           console.log(data);
            res.status(220).json({
                data: data,
                response:'success'
            });

        }
        catch(err){
           res.status(400).json({
            response:'error',
            error: err.message
           })
        }
       
    } 
        

    }

