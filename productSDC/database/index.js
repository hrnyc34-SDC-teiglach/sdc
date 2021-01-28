const mysql = require('mysql');
const bluebird = require('bluebird');
const config = require('../env/config.js');

const connection = mysql.createConnection(config);
const db = bluebird.promisifyAll(connection, {multiArgs: true});

module.exports = db;