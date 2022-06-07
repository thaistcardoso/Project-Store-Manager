require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_PORT || 'root', 
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_NAME || 'StoreManager',
});

module.exports = connection;
