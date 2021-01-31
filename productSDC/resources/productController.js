const db = require('../database/index.js');

module.exports = {

  getProducts: (req, res) => {
    //example: if page = 3, the products returned starts at product_id 11 using formula product_id = (5 * page) - 4
    const start = req.query.hasOwnProperty('page') ? (Number(req.query.page) * 5) - 4 : 1;
    const end = req.query.hasOwnProperty('count') ? (start + Number(req.query.count) - 1) : (start + 4);
    db.queryAsync(`SELECT * FROM products WHERE id BETWEEN ${db.escape(start)} AND ${db.escape(end)}`)
      .then(results => {
        res.status(200).json(results[0]);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      })
    },

  getProductInfo: (req, res) => {
    const { product_id } = req.params;
    db.queryAsync(`SELECT products.*, JSON_ARRAYAGG(JSON_OBJECT('feature', features.feature, 'value', features.value)) AS features FROM products INNER JOIN features ON (products.id = features.product_id) WHERE products.id = ${db.escape(product_id)} GROUP BY products.id`)
      .then(results => {
        results = results[0][0];
        results.features = JSON.parse(results.features)
        res.status(200).json(results)
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      })
  },

  getProductStyles: (req, res) => {
    const { product_id } = req.params;
    db.queryAsync(`SELECT styles.id AS style_id, styles.name, styles.sale_price, styles.original_price, styles.default_style AS 'default?', JSON_ARRAYAGG(JSON_OBJECT('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos, JSON_OBJECTAGG(skusx.id, JSON_OBJECT('quantity', skusx.quantity, 'size', skusx.size)) AS skus FROM styles INNER JOIN photos ON (styles.id = photos.style_id) INNER JOIN skusx ON (styles.id = skusx.style_id) WHERE styles.product_id = ${db.escape(product_id)} GROUP BY styles.id`)
      .then(results => {
        results = results[0];
        for (let result of results) {
          result.photos = JSON.parse(result.photos);
          result.skus = JSON.parse(result.skus);
        }
        res.status(200).json({product_id, results})
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      })
    // db.queryAsync(`SELECT styles.id AS style_id, styles.name, styles.sale_price, styles.original_price, styles.default_style AS 'default?', JSON_ARRAYAGG(JSON_OBJECT('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos FROM styles INNER JOIN photos ON (styles.id = photos.style_id) WHERE styles.product_id = ${db.escape(product_id)} GROUP BY styles.id`)
    //   .then(results => {
    //     results = results[0];
    //     db.queryAsync(`SELECT JSON_OBJECTAGG(skusx.id, JSON_OBJECT('quantity', skusx.quantity, 'size', skusx.size)) AS skus FROM skusx INNER JOIN styles ON (styles.id = skusx.style_id) WHERE styles.product_id = ${db.escape(product_id)} GROUP BY styles.id`)
    //       .then(skusxResults => {
    //         skusxResults = skusxResults[0];
    //         for (let i = 0; i < results.length; i++) {
    //           results[i].photos = JSON.parse(results[i].photos);
    //           results[i].skus = JSON.parse(skusxResults[i].skus);
    //         }
    //         res.status(200).json({product_id, results})
    //       })
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     res.sendStatus(500);
    //   })
  },

  getRelatedProducts: (req, res) => {
    const { product_id } = req.params;
    db.queryAsync(`SELECT JSON_ARRAYAGG(related_product_id) AS 'related_products' FROM related WHERE related.product_id = ${db.escape(product_id)} GROUP BY product_id`)
      .then(results => {
        results = results[0][0];
        results.related_products = JSON.parse(results.related_products);
        res.status(200).json(results.related_products);
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      })
  },
}

// const getProductInfo = (req, res) => {
//   const { product_id } = req.params;
//   db.queryAsync(`SELECT * FROM PRODUCTS WHERE id = ${db.escape(product_id)}`)
//     .then(productResults => {
//       db.queryAsync(`SELECT feature, value FROM FEATURES WHERE product_id = ${db.escape(product_id)}`)
//         .then(featureResults => {
//           const result = productResults[0][0];
//           result['features'] = featureResults[0];
//           res.status(200).json(result)
//         })
//     })
//     .catch(err => {
//       console.error(err);
//       res.sendStatus(500);
//     })
// }