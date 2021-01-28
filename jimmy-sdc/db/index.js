var mongoose = require("mongoose");
var mongoUri = 'mongodb://localhost/ratingsreviews';
// mongoose.Promise = Promise;

// Connect Mongoose to our local MongoDB via URI specified above

// mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});

if(process.env.MONGO_URL) {
  mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
} else {
  mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true});
}

var db = mongoose.connection;

// reviews schemas here:
var characteristicsSchema = new mongoose.Schema({
  id: ({
    type: Number,
    unique: true}),
  product_id: Number,
  name: String,
});

// Use schemas to instantiate models:
var characteristics = mongoose.model('characteristics', characteristicsSchema);

module.exports = db;