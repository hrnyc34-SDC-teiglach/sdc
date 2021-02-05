var mongoose = require("mongoose");
// var mongoUri = 'mongodb://localhost/reviews';
//mongodb, then container name, then db name
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
var testSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String
});

var reviewsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  rating: Number,
  date: String,
  summary: String,
  body: String,
  recommend: Number,
  reported: Number,
  reviewer_name: String,
  reviewer_email: String,
  helpfulness: Number  ,
  photos: [
    {
      id: Number,
      review_id: Number,
      url: String
    }
  ],
  reviews: [{
    id: Number,
    product_id: Number,
    name: String,
    characteristic_id: String,
    review_id: Number,
    value: Number
  }]
});

var characteristic_reviewsSchema = new mongoose.Schema({
    id: Number,
    product_id: Number,
    name: 'String',
    characteristic_id: Number,
    review_id: Number,
    value: Number
});

var photos_by_reviewSchema = new mongoose.Schema({

});

var characteristicsSchema = new mongoose.Schema({

});

var reviews_photosSchema = new mongoose.Schema({

});

// Use schemas to instantiate models:
module.exports = {
  Test: mongoose.model('test', testSchema),
  Reviews: mongoose.model('reviews', reviewsSchema),
  CharacteristicReviews: mongoose.model('characteristic_reviews', characteristic_reviewsSchema)
}

//From Aharon
//apparently you can define schemas by specificallygiving it a name as a 3rd argument
//Reviews: mongoose.model('Review', reviewsSchema, 'reviews')
//arguments in order : 1) Model name 2) schema to use 3) collection name

