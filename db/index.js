require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_PORT || 'trybe',
    password: process.env.MYSQL_PASSWORD || 'trybe12345',
    database: process.env.MYSQL_NAME || 'StoreManager',
});

module.exports = connection;
