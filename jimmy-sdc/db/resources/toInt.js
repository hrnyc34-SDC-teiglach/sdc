const mongoose = require('mongoose');
const db = require('../index.js');
//require table schema here
// const Pokemon = require('./charSchema.js');
//require data input here
// const pokemonData = require('../data/pokemon.json');

var convertIdToInt = function() {
  //wasnt able to use this function
  //just executed the below query in the Mongo shell
  //join characteristics and characteristic_reviews on characteristic_id
  db.characteristic_reviews.aggregate([
    {
       $lookup: {
          from: "characteristics",
          localField: "characteristic_id",    // field in the orders collection
          foreignField: "id",  // field in the items collection
          as: "char_id"
       }
    },
    {
       $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$char_id", 0 ] }, "$$ROOT" ] } }
    },
    { $project: { char_id: 0 } },
    { $out: "characteristic_reviews"}
 ])
};

db.reviews.aggregate([
  {
     $lookup: {
        from: "reviews_photos",
        localField: "id",
        foreignField: "review_id",
        as: "photos"
     }
  },
  {
    $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$char_id", 0 ] }, "$$ROOT" ] } }
  },
 { $project: { review_id: 0 } }
])

// NOTE: DO NOT invoke this function as part of your
// server code - it is meant to only be run once so that
// you have access to data to work with
convertIdToInt();
