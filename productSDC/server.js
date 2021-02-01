const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const db = require('./database/index.js');
const productRouter = require('./resources/productRouter.js');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '.env')})

const app = express();

app.use(cors({
  origin: ['http://localhost:3333'],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get('/', (req, res) => {
//   res.status(200).send('Hello!');
// });

app.use('/products', productRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
})