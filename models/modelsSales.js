const connection = require('../db');
require('dotenv').config();

const allSalesDB = () => connection.execute('SELECT * FROM StoreManager.sales');

const getSalesId = (id) => connection
.execute('SELECT * FROM StoreManager.sales WHERE id = ?;', [id]);

module.exports = {
    allSalesDB,
    getSalesId,
};