const db = require('./database/index.js');

db.query('SELECT * FROM SKUSX WHERE id BETWEEN 1 AND 2', (err, skusxResults) => {
  if (err) {
    console.error(err);
  } else {
    // console.log(skusxResults);
    for (skusxResult of skusxResults) {
      const style_id = Number(skusxResult.style_id);
      const size = skusxResult.size;
      const quantity = skusxResult.quantity;
      console.log('style_id', style_id, 'size', size, 'quantity', quantity);
      db.query(`SELECT * FROM SKUS WHERE style_id = ${db.escape(style_id)}`, (err, selectStyleIdResults) => {
        if (err) {
          console.error(err);
        } else {
          console.log('outside selectStyleIdResults', selectStyleIdResults);
          if (selectStyleIdResults.length === 0) {
            console.log('inside selectStyleIdResults', selectStyleIdResults.length)
            db.query(`INSERT INTO SKUS (style_id) VALUES (${db.escape(style_id)})`, (err, insertStyleIdResult) => {
              if (err) {
                console.error(err);
              } else {
                if (size === 'One Size') {
                  size = 'one_size';
                } else if (!isNaN(size)) {
                  size = `s${size.split('.').join('d')}`;
                }
                db.query(`UPDATE SKUS SET (${db.escape(size)}) = (${db.escape(quantity)}) WHERE style_id = ${db.escape(style_id)}`, (err, insertSizeResult) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log(insertSizeResult.insertId);
                  }
                })
              }
            })
          } else {
            db.query(`UPDATE SKUS SET (${db.escape(size)}) = (${db.escape(quantity)}) WHERE style_id = ${db.escape(style_id)}`, (err, insertSizeResult) => {
              if (err) {
                console.error(err);
              } else {
                console.log(insertSizeResult.insertId);
              }
            })
          }
        }
      })
    }
  }
})