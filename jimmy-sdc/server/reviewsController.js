var {Reviews} = require("../db/index.js");
var express = require("express");
var bodyParser = require("body-parser");

// Complete each of the following controller methods
exports.retrieve = function(req, res) {
  let page = Number(req.query.page) || 1;
  let count = Number(req.query.count) || 5;
  Reviews.find()
  .where({product_id: req.query.product_id})
  .where({id: {$gte: (page - 1) * count}})
  .limit(count)
  .exec()
  .then((results)=>{res.status(200).send(results)})
};

exports.retrieveMeta = function(req, res) {
  Reviews.aggregate([
    {
      $match:
      {
        product_id: Number(req.query.product_id)
      }
    },
    {
      $group: {
        _id: '$rating', count: {$sum:1}
      }
    }
  ])
  .exec()
  .then((results)=>{res.status(200).send(results)})
};

exports.addReview = function(req, res) {
  // Reviews.findOneAndUpdate(
  //   {recommend: "true"},
  //   {recommend: 1},
  //   {new: true,
  //   upset:false})
  //   .exec()
  //   .then((results)=>{res.status(201).send(results)})
};

exports.markAsHelpful = function(req, res) {
  Reviews.update({id: req.params.review_id}, {$inc:{helpfulness: 1}})
  .exec()
  .then((results)=>{res.status(204).send(results)})
};

exports.report = function(req, res) {
  Reviews.findOneAndUpdate(
    {id: req.params.review_id},
    {reported: 1},
    {new: true,
    upsert: false})
  .exec()
  .then((results)=>{res.status(204).send(results)})
};