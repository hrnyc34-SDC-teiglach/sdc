var Test = require("../db/index.js");
var express = require("express");
var bodyParser = require("body-parser");

// Complete each of the following controller methods
exports.retrieve = function(req, res) {
  res.status(200).send('Hello World')
  // var newPokemon = `${req.body.name}`;
  // var newPokemon = new Pokemon(
  //   {
  //     number: req.body.number,
  //     name: req.body.name,
  //     types: req.body.types,
  //     imageUrl: req.body.imageUrl,
  //   }
  // );
  // newPokemon.save((err, results)=>{
  //   if (err) {
  //     res.status(404).send('error creating pokemon');
  //   } else {
  //     res.status(201).json(results);
  //   }
  // });
};