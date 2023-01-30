const driverModel = require("../models/driverModel")
const jwt = require('jsonwebtoken');
const invitationModel = require("../models/invitationModel");
require('dotenv').config();
module.exports ={
    sendInvitation:async (req,res)=>{
        const user_token = (req.headers.authorization).split(' ')[1];
        const user =await jwt.verify(user_token,process.env.JWT_SECRET);
        const userId = user.userId;
        const invitation_data = {
            userId: userId,
            driverId:req.body.driverId,
            DestinationFrom:{
                type:'Point',
                coordinates:[req.body.longitude,req.body.latitude]
            },
            isAccepted: false
        }
        const invitationData = new invitationModel(invitation_data);
        const invitationModelSaved = await invitationData.save();
        const data = await     driverModel.findByIdAndUpdate(req.body.driverId, {
            $push: {notifications:invitationModelSaved._id}
           
        },{
            new: true   
        });

        res.status(220).json({
response:'success',
data: data,
invitationData: invitationModelSaved
        })
    },
    getInvitations:async (req,res)=>{
        const data = await invitationModel.find({});
        res.status(200).json({
            data: data,
            
        })
    }
}