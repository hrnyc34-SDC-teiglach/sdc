const mysql = require('mysql');
const bluebird = require('bluebird');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../env/.env')})

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_USE
});
const db = bluebird.promisifyAll(connection, {multiArgs: true});

module.exports = db;