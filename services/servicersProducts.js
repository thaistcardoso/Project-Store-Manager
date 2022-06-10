const { getAll, getProductId, insertProduct, upDateProduct } = require('../models/modelProducts');

const getAllProducts = async () => {
    const [allProductsSearch] = await getAll();
    return allProductsSearch;
};

const prodId = async (id) => {
    const newProdId = await getProductId(id);
    return newProdId;
};

const insertProd = (name, quantity) => {
    const newProduct = insertProduct(name, quantity);
    return newProduct;
};

const upDateById = async (name, quantity, id) => {
    const newUpDate = await upDateProduct(name, quantity, id);
    return newUpDate;
};

module.exports = {
    getAllProducts,
    prodId,
    insertProd,
    upDateById,
};