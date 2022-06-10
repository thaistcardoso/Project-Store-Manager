const connection = require('../db');
require('dotenv').config();

const getAll = async () => {
    const getAllSearch = await connection.execute('SELECT * FROM StoreManager.products'); 
    return getAllSearch;
};

const getProductId = async (id) => {
    const [getById] = await connection.execute(
        'SELECT * FROM StoreManager.products WHERE id = ?', [id],
    );
    return getById;
};

const insertProduct = async (name, quantity) => {
    const newProd = await connection.execute(
        'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);', [name, quantity],
    );
    // console.log('models', name, quantity);    
    return newProd;
};

const upDateProduct = async (name, quantity, id) => {
    await connection.execute(
        'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;', 
        [name, quantity, id],
    );
    return true;
};

module.exports = {
    getAll,
    getProductId,
    insertProduct,
    upDateProduct,
};