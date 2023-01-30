const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var validateEmail = function(email) {
     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     return re.test(email)
 };
const {isEmail}  = require('validator')
const userSchema =new mongoose.Schema({
     userName:{
          type: String,
          minLength: 4,
          required: true,
          unique: true
          
     },
     password: {
          type: String,
          minLength: 8,
          requried: true
     },
     ridesDriven:{
          type: Number,
          default: 0,

     },
     email: {
          type: String,
          validate: [isEmail,'Email is required to register further'],
          required: true
          
     },
     profileImage:{
          type: String,
          default: '/uploads/avatar.png',

     }

     
});


userSchema.method('comparePassword',function(password, next){
     bcrypt.compare(password, this.password,function(err,result){
          if (result){
               next();
          }else{
               throw new Error('Comparing password failed');
          }
     })
})

userSchema.pre('save',async function(next){
     this.password =await bcrypt.hash(this.password,10);
 });
const userModel = new mongoose.model('User',userSchema);

module.exports = userModel;