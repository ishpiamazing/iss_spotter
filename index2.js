//const fetchMyIP = require('./iss_promised.js');
//const  { fetchIP,fetchCoordsByIP,fetchISSFlyOverTimes} = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');


// fetchIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

nextISSTimesForMyLocation()
  .then((passTimes) => {
    console.log(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });