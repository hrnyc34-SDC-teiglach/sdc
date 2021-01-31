var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var path = require('path');

// Create the Express application:
const port = 3000;
var app = express();
app.listen(port, function() {
  console.log("Listening on port " + port);
});

//Router
var reviewsRouter = require('./reviewsRouter.js');
app.use('/reviews', reviewsRouter);

// Attach middleware:
app.use(bodyParser.json());

//I don't think you need express static here because we're not serving any files in this layer
app.use(express.static(path.join(__dirname, '..', 'fec', 'dist')));

app.get("/", function(req, res) {
  res.status(200).send('Greetings Earth');
});

//Routes:
app.get('/', reviewsRouter.get);

module.exports = app;
