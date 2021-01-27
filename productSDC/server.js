const express = require('express');
const db = require('./database/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
})