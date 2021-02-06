const db = require('../database/index.js');

module.exports = {

  getProducts: (req, res) => {
    //example: if page = 3, the products returned starts at product_id 11 using formula product_id = (5 * page) - 4
    const start = req.query.hasOwnProperty('page') ? (Number(req.query.page) * 5) - 4 : 1;
    const end = req.query.hasOwnProperty('count') ? (start + Number(req.query.count) - 1) : (start + 4);
    db.queryAsync(`SELECT * FROM PRODUCTS WHERE id BETWEEN ${db.escape(start)} AND ${db.escape(end)}`)
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
    db.queryAsync(`SELECT PRODUCTS.*, JSON_ARRAYAGG(JSON_OBJECT('feature', FEATURES.feature, 'value', FEATURES.value)) AS features FROM PRODUCTS INNER JOIN FEATURES ON (PRODUCTS.id = FEATURES.product_id) WHERE PRODUCTS.id = ${db.escape(product_id)} GROUP BY PRODUCTS.id`)
      .then(results => {
        results = results[0][0];
        results.features = JSON.parse(results.features)
        res.status(200).json(results)
      })
  },

  getProductStyles: (req, res) => {
    const { product_id } = req.params;
    //Working Solution: 2 separate queries involving inner joins, 1 for photos and 1 for skus
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

    //for some reason the photos array objects aggregates duplicates when also aggregating the skus
    // db.queryAsync(`SELECT styles.id AS style_id, styles.name, styles.sale_price, styles.original_price, styles.default_style AS 'default?', JSON_ARRAYAGG(JSON_OBJECT('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) AS photos, JSON_OBJECTAGG(skusx.id, JSON_OBJECT('quantity', skusx.quantity, 'size', skusx.size)) AS skus FROM styles INNER JOIN photos ON (styles.id = photos.style_id) INNER JOIN skusx ON (styles.id = skusx.style_id) WHERE styles.product_id = ${db.escape(product_id)} GROUP BY styles.id`)

    //Working Solution: 2 sub-queries - 1 sub-query for photos and 1 sub-query for skus
    // db.queryAsync(`SELECT styles.id AS style_id, styles.name, styles.sale_price, styles.original_price, styles.default_style AS 'default?', (SELECT JSON_ARRAYAGG(JSON_OBJECT('thumbnail_url', photos.thumbnail_url, 'url', photos.url)) FROM photos WHERE styles.id = photos.style_id) AS photos, (SELECT JSON_OBJECTAGG(skusx.id, JSON_OBJECT('quantity', skusx.quantity, 'size', skusx.size)) FROM skusx WHERE styles.id = skusx.style_id) AS skus FROM styles WHERE styles.product_id = ${db.escape(product_id)}`)

    //Working Solution: 1 sub-query for photos and 1 inner join for skus
    db.queryAsync(`SELECT STYLES.id AS style_id, STYLES.name, STYLES.sale_price, STYLES.original_price, STYLES.default_style AS 'default?', (SELECT JSON_ARRAYAGG(JSON_OBJECT('thumbnail_url', PHOTOS.thumbnail_url, 'url', PHOTOS.url)) FROM PHOTOS WHERE STYLES.id = PHOTOS.style_id) AS photos, JSON_OBJECTAGG(SKUSX.id, JSON_OBJECT('quantity', SKUSX.quantity, 'size', SKUSX.size)) AS skus FROM STYLES INNER JOIN SKUSX ON (STYLES.id = SKUSX.style_id) WHERE STYLES.product_id = ${db.escape(product_id)} GROUP BY STYLES.id`)
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

  },

  getRelatedProducts: (req, res) => {
    const { product_id } = req.params;
    db.queryAsync(`SELECT JSON_ARRAYAGG(related_product_id) AS 'related_products' FROM RELATED WHERE RELATED.product_id = ${db.escape(product_id)} GROUP BY product_id`)
      .then(results => {
        // results = results[0][0].related_products;
        // results = JSON.parse(results);
        // res.status(200).json(results);
        res.status(200).json(JSON.parse(results[0][0].related_products))
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