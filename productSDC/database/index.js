const mysql = require('mysql2');
const bluebird = require('bluebird');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../env/.env')})

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: '3306',
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
const db = bluebird.promisifyAll(connection, {multiArgs: true});

module.exports = db;