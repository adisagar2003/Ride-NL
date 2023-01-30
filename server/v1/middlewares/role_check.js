module.exports = (req,res,next,role) => {
        if (role=='admin'){
            next();
        }
        else{
          throw new Error('The user is not authorized to carry this operation')
        }
}