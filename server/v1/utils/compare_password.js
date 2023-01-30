const bcrypt = require('bcrypt');

module.exports = async function comparePassword( plainPassword, hashedPassword){
   const c = await bcrypt.compare(plainPassword,hashedPassword);
   return c;
}