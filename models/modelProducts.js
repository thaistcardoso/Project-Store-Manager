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

const deleteProduct = async (id) => {
    const deleteProductDB = await connection.execute(
        'DELETE FROM StoreManager.products WHERE id = ?;', [id],
    );
    return deleteProductDB;
};

const getQuantityById = async (id) => {
    const ProductQtd = await connection.execute(
        'SELECT quantity FROM StoreManager.products WHERE id = ?;', [id],
    );
        return ProductQtd;
};

const upDateQuantityProduct = async (quantity, id) => {
    const UpDatedProduct = await connection.execute(
        'UPDATE StoreManager.products SET quantity = ? WHERE id = ?;', [quantity, id], 
    );

    return UpDatedProduct;
};

module.exports = {
    getAll,
    getProductId,
    insertProduct,
    upDateProduct,
    deleteProduct,
    getQuantityById,
    upDateQuantityProduct,
};