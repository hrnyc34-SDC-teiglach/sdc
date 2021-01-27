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
// var pokemonSchema = new mongoose.Schema({
//   number: ({
//     type: Number,
//     unique: true}),
//   name: ({
//     type: String,
//     unique: true}),
//   types: [String],
//   imageUrl: String
// });

// Use schemas to instantiate models:
// var Pokemon = mongoose.model('Pokemon', pokemonSchema);

// module.exports = Pokemon;