let NodeGeocoder = require('node-geocoder');
let options = {
  provider: 'google',

  httpAdapter: 'https', // Default
  apiKey: process.env.FETCH_LATLONG,
  formatter: null         // 'gpx', 'string', ...
};

let geocoder = NodeGeocoder(options);

class FetchData {
  /** 
   This function get the longitude and latitude of a given place
 * @method doFetchData
 * @param {String} EventLocation - string
 * @return {Promise}  return Array 
 * The Array contains latitude & longitude of Location,City,Address Entered
 */
  
  static doFetchData(EventLocation) {
    return new Promise(
      (resolve, reject) => {
        //the entered data is used to find relevant data, e.g. longitude,latitude, city 
        geocoder.geocode(EventLocation)
          .then(function (res) {
            //collect assign variable to collect longitude & latitude 
            let lat = res[0].latitude;
            let long = res[0].longitude;
             let eventlatlong = [lat,long];
           resolve(eventlatlong);
          })
          .catch(function (err) {
            reject(err);
          });
      });
  }
}

module.exports = FetchData;