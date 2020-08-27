const request = require('request-promise-native');
/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */

//  const url = 'https://api.ipify.org?format=json';
//  const urlCoords = "https://ipvigilante.com/";

const fetchIP = function() {
  return request('https://api.ipify.org?format=json');
};

//  * Makes a request to ipvigilante.com using the provided IP address, to get its geographical information (latitude/longitude)
//  * Input: JSON string containing the IP address
//  * Returns: Promise of request for lat/lon
//  */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};


/*
 * Requests data from api.open-notify.org using provided lat/long data
 * Input: JSON body containing geo data response from ipvigilante.com
 * Returns: Promise of request for fly over data, returned as JSON string
 */
const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};


const nextISSTimesForMyLocation = function() {
  return fetchIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      for (let responses of response) {
        let timeInSeconds = responses.duration;
        const datetime = new Date(0);
        datetime.setUTCSeconds(responses.risetime);
        console.log(`Next pass at ${datetime} for ${timeInSeconds} seconds!`);
      }
      //return response;
    });
};

module.exports = { nextISSTimesForMyLocation };


//module.exports = { fetchIP, fetchCoordsByIP, fetchISSFlyOverTimes};

// module.exports = fetchIP;

