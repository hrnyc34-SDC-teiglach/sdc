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
app.use(express.static(path.join(__dirname, '..', 'fec', 'dist')));

app.get("/", function(req, res) {
  res.status(200).send('Greetings Earth');
});

//Routes:
// app.get('/', pokemonRouter.get);

module.exports = app;
