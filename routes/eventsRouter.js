//requires the required modules
const express = require("express");
const router = express.Router();
const eventSearchController = require("../controllers/fbSearchController");


//establishes the route for the events search (eventSearchController.searchForEvents)
router.route("/event/:event")
    .post(eventSearchController.searchEvents);


// router.get("/search/:event", eventSearchController.searchEvents);
//exports the route to be used
module.exports = router;