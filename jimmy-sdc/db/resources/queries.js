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

//group all photos by their review id
db.reviews_photos.aggregate( [
  {
     $group:
        {
           _id: "$review_id",
           photos: { $push:  { id: "$id", url: "$url" } }
        }
  },
  //export to new table
  { $out: "photos_by_review"}
],
  {
  allowDiskUse: true
  }
)

//add photos array to all documents
//populate with data if it exists in photos_by_review
db.reviews.aggregate([
   { $addFields: { photos: [] } },
   {
      $lookup: {
         from: "reviews_photos",
         localField: "id",
         foreignField: "review_id",
         as: "photos"
      }
   },
   {
      $replaceRoot: {
         newRoot: {
            $mergeObjects: [ {
               $arrayElemAt: [ "$photos", 0 ] },
                  "$$ROOT" ] } }
   },
   { $project:
      {photos: 0}
   },
   { $out: "reviews"}
],
{
  allowDiskUse: true
}
)

// NOTE: DO NOT invoke this function as part of your
// server code - it is meant to only be run once so that
// you have access to data to work with
convertIdToInt();


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
      $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$photos", 0 ] }, "$$ROOT" ] } }
   },
   { $project: { photos: 0 } },
   { $out: "reviews"}
])

//this looks mostly like what I want it to do
//I ran this query overnight, which is similar to the one Cody gave me
//both of them sorta timed out, didnt finish running but not populating the temp table in Compass
db.reviews.aggregate([
   {
      $lookup: {
         from: "photos_by_review",
         let: {
            review_id: '$id'
         },
         pipeline: [
            {
               $match: {
                  $expr: {
                     $eq: [
                        '$_id',
                        '$$review_id'
                     ]
                  }
               }
            },
            {
               {$project: {_id:0}}
            }
         ],
         as: "photos"
      }
   },
   {$project: {photos._id: 0}}
   { $out: "reviewsXphotos"}
],
{
  allowDiskUse: true
}
)

//Alberts Query
db.products.aggregate([
   {
     $lookup: {
       'from': 'related',
       'localField': 'id',
       'foreignField': 'current_product_id',
       'as': 'related_Products_obj'
     }
   }, {
     '$addFields': {
       'related_Projects': '$related_Products_obj.related_product_id'
     }
   }, {
     '$project': {
       'related_Products_obj': 0
     }
   }, {
     '$out': 'products'
   }
 ])



//another join attempt
{$lookup:
 {
   from: "photos_by_review",
   let: {
      review_id: '$id'
   },
   pipeline: [
      {
         $match: {
            $expr: {
               $eq: [
                  '$_id',
                  '$$review_id'
               ]
            }
         }
      },
      { $project:
        {_id: 0}
      }
   ],
   as: "photos",
}
}

{$unwind:
{
   path: '$photos_temp',
   preserveNullAndEmptyArrays: true
 }
}