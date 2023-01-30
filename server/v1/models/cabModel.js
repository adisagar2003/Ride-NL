const mongoose = require('mongoose');

const cabSchema = new mongoose.Schema({
    vehicleModel:{
        type: String,
        required: true
    },
    regNo:{
        type: Number,
        required: true
    },
    seats:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    }
});

const carModel = mongoose.model('Cab', cabSchema);

