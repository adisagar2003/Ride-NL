const mongoose = require('mongoose');
const invitationSchema = mongoose.Schema({
userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
},
driverId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
},
Credits:{
    type: Number,
    required: true,
    default:50
},

DestinationFrom:{
    type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true,
        default:'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
}
,
isAccepted:{
    type: Boolean,
    default : false,
    required: true
},
createdAt:{type: Date, expires:'2h',default: Date.now()}
});

const invitationModel = mongoose.model('Invitation',invitationSchema);

module.exports = invitationModel;
