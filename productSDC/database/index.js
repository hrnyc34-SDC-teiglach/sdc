const mysql = require('mysql');
const bluebird = require('bluebird');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../env/.env')})

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
const db = bluebird.promisifyAll(connection, {multiArgs: true});

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   port: '3306',
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_ROOT_PASSWORD,
//   database: process.env.MYSQL_DATABASE
// });
// const db = bluebird.promisifyAll(connection, {multiArgs: true});

module.exports = db;