const express = require('express');
const router = express.Router();
const displayPagesController = require('../controllers/displayController');

//home page
router.route("/")
    .get(displayPagesController.homepage);

module.exports = router;