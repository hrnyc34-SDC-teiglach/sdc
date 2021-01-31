var reviewsRouter = require("express").Router();
var reviewsController = require("./reviewsController.js");

// Create route handlers for each of the six methods in pokemonController
reviewsRouter.route("/");

//GET /reviews?page=1&count=5&sort='newest'&product_id=5
reviewsRouter.get("/", reviewsController.retrieve);

//GET /reviews/meta?product_id=11001
reviewsRouter.get("/meta", reviewsController.retrieveMeta);

//POST /reviews
//req.body={
//product_id=11001
//rating=5
//summary='text'
//body='text'
//recommend=true
//name='text'
//email='text'
//photos=['text']
//characteristics={'5': 3} id might be a string?
//}
reviewsRouter.post("/", reviewsController.addReview);

//PUT /reviews/:review_id/helpful
reviewsRouter.put("/:review_id/helpful", reviewsController.markAsHelpful);

//PUT /reviews/:review_id/report
reviewsRouter.put("/:review_id/report", reviewsController.report);

module.exports = reviewsRouter;
