const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'User'
    },
    driverId: {
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Driver'
    },
    paymentId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Payment'
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    destination:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
        },
        createdAt: {
            type:  Date,
            default: Date.now(),
            required : true
        }
});

const tripModel =mongoose.model('Trip',tripSchema);

module.exports = tripModel;
