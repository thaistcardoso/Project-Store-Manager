const connection = require('../db');
require('dotenv').config();

const getAll = () => connection.execute('SELECT * FROM StoreManager.products');

const getProductId = (id) => connection
.execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);

module.exports = {
    getAll,
    getProductId,
};