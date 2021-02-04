var fs = require('fs');
var path = require('path');

const characteristics = path.join(__dirname, '../characteristics.csv');
const photos = path.join(__dirname, '../photos.csv');
const reviews = path.join(__dirname, '../reviews.csv');


//returns the word count of a single designated file
fs.readFile(reviews, 'utf-8', function(err, data) {
  if (err) {
    console.log(err);
    return;
  }

//function will stop in the event of an error
// else, runs callback on wordCount

  var wordCount = data.trim().split(',').slice(0, 100);
  // var wordCount = data.trim().slice(0, 100);
  //there is no return value, just invokes callback on wordCount
  console.log(wordCount);
});

