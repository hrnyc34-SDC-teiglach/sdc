const express = require('express');
const db = require('./database/index.js');
const productRouter = require('./resources/productRouter.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.status(200).send('Hello!');
});

app.use('/products', productRouter);

PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
})