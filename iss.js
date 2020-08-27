const request = require('request');
const url = "https://api.ipify.org?format=json";
// const urlCoords = "https://ipvigilante.com/";
const urlCoords = "https://ipvigilante.com/";
// const url = "https://google.ca/sfsjklajflkajflkasjkf";
// const urlSat = "http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON"
const urlSat = "http://api.open-notify.org/iss-pass.json?";
// const urlSat = "http://api.open-notify.org/iss-pasas.json?"

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request(url, (error, response, body) => {
    // console.log(`error: ${error}`)
    // console.log(`response: ${response}`)
    // console.log(`body: ${body}`)
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      // console.log(msg);
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).ip;
    callback(null, data);

  });
  // use request to fetch IP address from JSON API
  
};

const fetchCoordsByIP = function(ip, callback) {
  let coord = {};
  request(urlCoords + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
    // console.log(urlCoords+ip);
    // console.log(`error: ${error}`)
    // console.log(`response: ${response.statusCode}`)
    // console.log(`body: ${body}`)
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      // console.log(msg);
      callback(Error(msg), null);
      return;
    }

    coord['longitude'] = (JSON.parse(body)).data.longitude;
    coord['latitude'] = (JSON.parse(body)).data.latitude;
    
    // console.log(coord);
    callback(error, coord);

  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  let lat = coords.latitude;
  let lon = coords.longitude;
  let locSat = `lat=${lat}&lon=${lon}`;
  // console.log(locSat);
  request(urlSat + locSat, (error,response,body) => {
    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      // console.log(msg);
      callback(Error(msg), null);
      return;
    }
    // console.log(body);
    const dur = JSON.parse(body).response;
    callback(error,dur);


  });
};

// module.exports = fetchMyIP;
// module.exports = fetchCoordsByIP;
// module.exports = fetchISSFlyOverTimes;

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      // console.log("It didn't work!" , error);
      // return;
      return callback(error, null);
    }
  
    fetchCoordsByIP(ip, (error,data) => {
      if (error) {
        // console.log("It didn't work!" , error);
        // console.log("-----------------");
        // console.log(error);
        // console.log("-----------------");
        // return;
        return callback(error, null);
      }
  
      // console.log(`latitude: ${data.latitude} longitude: ${data.longitude} `);
      fetchISSFlyOverTimes(data, (error, result) => {
        if (error) {
          // console.log("It didn't work!" , error);
          // return;
          return callback(error, null);
        }
  
        callback(error, result);
  
  
      });
    });
  
    // console.log(ip);
    // return ip;
  
    // console.log('It worked! Returned IP:' , ip);
  });
}

// module.exports = {
//   fetchMyIP: fetchMyIP,
//   fetchCoordsByIP: fetchCoordsByIP,
//   fetchISSFlyOverTimes: fetchISSFlyOverTimes,
//   nextISSTimesForMyLocation: nextISSTimesForMyLocation
// };

module.exports = nextISSTimesForMyLocation;