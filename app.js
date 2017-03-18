require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const routes = require('./routes/diplayPageRouter'); 
const eventRoute = require('./routes/eventsRouter');

app.set('view engine' , 'ejs');

//middleware used
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(routes);
app.use(eventRoute);

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server listening on port ${process.env.PORT || 3001}`);
});