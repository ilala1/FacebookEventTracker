# FacebookEventTracker
Finding facebook events via location

This project demonstrates how to retrieve facebook events and mark them on a google map using facebook graph api and google's geolocation. This prototype makes use of third party frameworks and modules e.g. express, body-parser etc. to help will the structure and development of the application.

Technologies

Javascript
Node.js
Modules

Node-geocoder
facebook-events-by-location-core
Objectives

To show facebook events plotted onto a google map
Using the facebook api, search for events near my current location
Use google geo location to get the coordinates of the location entered by the user
Return a list of facebook events in a table view
Show a google map with facebook events plotted
When you click on an event either via the map or the table you should see a modal with the event information and a link to buy tickets
Git

Clone the repository here:

git clone https://github.com/armani2k20/FB-EVENTS-BY-LOCATION.git

Usage

To use this application, the user must do the following:

Enter a location e.g. London (post codes work too)
Click 'Find Event'
A table will be generated with a list of events that have been shared on Facebook. The events will also be marked on the google map. The user can see more information about the event by clicking on the map marker or the name of the event in the table.

This is the basic usage pattern of the module.

Facebook events search

    const EventSearch = require("facebook-events-by-location-core");
    const es = new EventSearch({
        "lat": lat,
        "lng": lng,
        //facebook api access token
        "accessToken": "FB-ACCESS-TOKEN"
    });
    es.search().then(function (events) {
        //returns the JSON data in a large string format
        let jsonData = JSON.stringify(events);
        console.log(jsonData);
        resolve(jsonData);

    })
    .catch(function (error) {
        //returns an error if the data cannot be successfully retrieved
        let jsonDataError = JSON.stringify(error);
        console.error(jsonDataError);
        reject(jsonDataError);
    });
Geolocation

    //requires the node-geocoder module
    const NodeGeocoder = require('node-geocoder');

    var options = {
        provider: 'google',
        // Optional depending on the providers 
        httpAdapter: 'https', // Default 
        //google geo api key
        apiKey: 'GOOGLE-API-KEY',
        // 'gpx', 'string', ... 
        formatter: null
    };

    geocoder.geocode(data)
        .then(function (res) {
            console.log(res);
            //assigning varibables to the events longitude and latitude data
            let lat = res[0].latitude;
            let long = res[0].longitude;
            //return the resolved promise data (longitude and latitude)
            resolve([long, lat]);
        })
Access Tokens

In order to successfully retrieve and mark events by location, the application requires a pair of App keys, one for the Facebook graph Api FB-ACCESS-TOKEN and one for the google geolocation GOOGLE-API-KEY.

Parameters

Mandatory parameters are the following:

lat: The latitude of the position/coordinate the events shall be returned for
lng: The longitude of the position/coordinate the events shall be returned for

