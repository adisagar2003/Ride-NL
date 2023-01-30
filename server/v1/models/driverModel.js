const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


const driverScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true, 
        
    },
    cabId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cab'    
    },
    email:{
        type: String,
        required: true,
        
    },
    dob:{
        type: Date,
        required: true,

    },
    location: {
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
      },
    password:{
        type:String,
        required: true
    },
    profileImage:{
        type:String,
        default:'uploads//static.png',
        required: true
    },
    notifications:{
        type: [String],
        default:[],
        required: true,
    
    }
});


driverScheme.index({location:"2dsphere"});

driverScheme.pre('save',async function(next){
let age =await getAge(this.dob)
if (age>18){
    next();
}
else{
    throw new Error('The age entered is lower than 18')
}
})

driverScheme.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    
})
const driverModel = mongoose.model('Driver',driverScheme);

module.exports = driverModel;
