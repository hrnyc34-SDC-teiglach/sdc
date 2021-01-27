var reviewsRouter = require("express").Router();
var reviewsController = require("./reviewsController.js");

// Create route handlers for each of the six methods in pokemonController
reviewsRouter.route("/");

// pokemonRouter.get("/", pokemonController.retrieve);

// pokemonRouter.get("/:number", pokemonController.retrieveOne);

// pokemonRouter.post('/', pokemonController.createOne);

// pokemonRouter.put("/:number", pokemonController.updateOne);

// pokemonRouter.delete('/:number', pokemonController.deleteOne);

// pokemonRouter.delete('/', pokemonController.delete);

module.exports = reviewsRouter;
