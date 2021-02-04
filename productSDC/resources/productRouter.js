var productRouter = require("express").Router();
var productController = require("./productController");

productRouter.get('/', productController.getProducts);
productRouter.get('/:product_id', productController.getProductInfo);
productRouter.get('/:product_id/styles', productController.getProductStyles);
productRouter.get('/:product_id/related', productController.getRelatedProducts)

module.exports = productRouter;