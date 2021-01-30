const db = require('./database/index.js');

db.queryAsync('SELECT * FROM SKUSX WHERE ID BETWEEN 26800001 AND 26961739')
  .then(results => {
    for (let result of results[0]) {
      let id = result.id;
      let style_id = Number(result.style_id);
      let size = result.size;
      let quantity = result.quantity;
      // console.log('id', id, 'style_id', style_id, 'size', size, 'quantity', quantity);
      db.queryAsync(`INSERT IGNORE INTO SKUS (style_id) VALUES (${style_id})`)
        .then(result => {
          if (size === 'One Size') {
            size = 'One_Size';
          } else if (!isNaN(size)) {
            size = `s${size.split('.').join('d')}`;
          }
          db.queryAsync(`UPDATE SKUS SET ${size} = ${quantity} WHERE style_id = ${style_id}`)
            .then(() => {
              console.log(id)
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
  })
  .catch(err => console.error(err));