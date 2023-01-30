const driverModel = require('../models/driverModel');


module.exports = async (coordinates)=>{
        let result;
        let resultWithDistance;
        function calculateDistance(driverCoordinates){
            distance = Math.sqrt((coordinates[0]-driverCoordinates[0])^2 + (coordinates[1]-driverCoordinates[1])^2);
            return distance;
        }
        const drivers =await driverModel.find({
            location: {
              $near: {
                $geometry: {
                  type: "Point",
                  coordinates: [coordinates[0], coordinates[1]],
                },
                $maxDistance: 3000,
              },
            },
          });  
         console.log(drivers);
        result = drivers;
        drivers.map((driver)=>{
           let distance =  calculateDistance(driver.location.coordinates);
           resultWithDistance = {...driver,distance: distance}
        })



        return result
    }

