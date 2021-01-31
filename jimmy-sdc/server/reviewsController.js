var {Reviews} = require("../db/index.js");
var express = require("express");
var bodyParser = require("body-parser");

// Complete each of the following controller methods
exports.retrieve = function(req, res) {
  //SELECT * FROM reviews WHERE product_id=5
  Reviews.find({product_id: req.query.product_id})
  .exec()
  .then((results)=>{res.status(200).send(results)})

};

exports.retrieveMeta = function(req, res) {

};

exports.addReview = function(req, res) {

};

exports.markAsHelpful = function(req, res) {

};

exports.report = function(req, res) {

};