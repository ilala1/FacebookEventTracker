//require the facebook event search modles
const EventSearch = require("facebook-events-by-location-core");

class facebookSearch {
    /** 
    This function calls an api which gather events within a given miles radius 
    * @method doFacebookSearch
    * @param {Array} EventLatLong - array
    * @return {Promise}  return  data called from API 
    */

    static doFacebookSearch(EventLatLong) {
        return new Promise(
            (resolve, reject) => {
                let eLSearch = new EventSearch({
                    "lat": EventLatLong[0],
                    "lng": EventLatLong[1],
                    accessToken: process.env.FACEBOOK_SEARCH
                });
                eLSearch.search().then(function (events) {
                        let result = JSON.stringify(events);
                        console.log(result);
                        resolve(result);

                    }).catch(function (error) {
                        reject(error)
                    });
            });
    }
}

module.exports = facebookSearch;