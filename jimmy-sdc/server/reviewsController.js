var {Reviews, CharacteristicReviews} = require("../db/index.js");
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

exports.retrieveMeta = async function(req, res) {
  let ratings = Reviews.aggregate([
    {
      $match:
      {
        product_id: Number(req.query.product_id)
      }
    },
    {
      $group: {
        _id: '$rating',
        count: {$sum: 1}
      }
    }
  ])
  .exec()

  let recs = Reviews.aggregate([
    {
      $match:
      {
        product_id: Number(req.query.product_id)
      }
    },
    {
      $group: {
        _id: '$recommend',
        count: {$sum: 1}
      }
    }
  ])
  .exec()

  let chars = CharacteristicReviews.aggregate([
    {
      $match:
      {
        product_id: Number(req.query.product_id)
      }
    },
    {
      $group: {
        _id: '$name',
        value: {$avg: '$value'}
      }
    }
  ])
  .exec()

  let meta = await Promise.all([ratings, recs, chars]);
  res.status(200).send({
    ratings:{...meta[0]},
    recs:{...meta[1]},
    characteristics:{...meta[2]}
  });
};

exports.addReview = function(req, res) {
  let newReview = new Reviews({
    id:'', //autoincrement
    product_id: '' //where does this come from? state?
  })
  /*
  handleSubmitReview({product_id: currentProductId, rating, characteristics, recommend, summary, body, name, email, photos})

  product_id = take from state?
  id = ???
  date = today
  reported = 0
  helpfulness = 0

  rating
  characteristics:
  -comfort
  -quality
  -length
  -fit
  recommend
  summary
  body
  nickname
  email
  */

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