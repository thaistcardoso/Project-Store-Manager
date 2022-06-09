const connection = require('../db');
require('dotenv').config();

const getAll = () => connection.execute('SELECT * FROM StoreManager.products');

const getProductId = (id) => connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);

const insertProduct = async (name, quantity) => {
    const newProd = await connection.execute(
        'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);', [name, quantity],
        );
    // console.log('models', name, quantity);    
    return newProd;
};

module.exports = {
    getAll,
    getProductId,
    insertProduct,
};