const jwt = require('jsonwebtoken');
require('dotenv').config()
module.exports = (req,res,next) => {
   
    const token = (req.headers.authorization).split(' ')[1]
jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){
    if (decoded !=undefined){
        console.log(decoded);
         next();
    }
    else{
      res.status(400).json({
        response:'error User token not authorized'
      })
     
    }
})
}