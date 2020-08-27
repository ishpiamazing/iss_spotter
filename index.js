// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation }  = require('./iss.js');
const nextISSTimesForMyLocation = require('./iss.js');
// const fetchCoordsByIP  = require('./iss.js');
// const fetchISSFlyOverTimes = require('./iss.js');

// let ip = "174.88.171.207";
// let ip = "256.256.215.256";
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   fetchCoordsByIP(ip, (error,data) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       // console.log("-----------------");
//       // console.log(error);
//       // console.log("-----------------");
//       return;
//     }

//     // console.log(`latitude: ${data.latitude} longitude: ${data.longitude} `);
//     fetchISSFlyOverTimes(data, (error, result) => {
//       if (error) {
//         console.log("It didn't work!" , error);
//         return;
//       }

//       console.log(result);


//     });
//   });

//   // console.log(ip);
//   // return ip;

//   // console.log('It worked! Returned IP:' , ip);
// });





// fetchCoordsByIP(ip, (error,data) => {
//   if(error){
//         console.log("It didn't work!" , error);
//         // console.log("-----------------");
//         // console.log(error);
//         // console.log("-----------------");
//         return;
//   }
//   console.log(`latitude: ${data.latitude} longitude: ${data.longitude} `);
// });


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }


  // success, print out the deets!
  for ( let pass of passTimes ){
    let timeInSeconds = pass.duration;
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    // let dateOfPass = new Date(pass.risetime);
    console.log(`Next pass at ${datetime} for ${timeInSeconds} seconds!`);
  }
});

