const mongoose = require('mongoose');
const db_conn = (uri) => {
    mongoose.connect(uri).then((result)=>{
        console.log('database connected successfully');
    }).catch(err=>{
        console.log(err,'error in connection');
    });

}
module.exports = db_conn;