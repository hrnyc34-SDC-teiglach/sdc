const mysql = require('mysql');
const config = require('../../config.js');

const db = mysql.createConnection(config);