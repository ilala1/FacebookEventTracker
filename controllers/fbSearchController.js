const fbSearch = require('../lib/fbSearch');
const geo = require('../lib/fetchEventLocationLatandLong');

class Events {
    static searchEvents(req, res) {
        geo.doFetchData(req.body.city)
            .then(result => {
                return fbSearch.doFacebookSearch(result)
            })
            //respond with ok status if the longitude and latitude are successfully retrived
            .then(result => {
                res.status(200).send(result);
            })
            //resppond with 400 error if not successful
            .catch(err => {
                res.status(400).status(err.message);
            });
    }
}
module.exports = Events;