const { getAll, getProductId, insertProduct } = require('../models/modelProducts');

const getAllProducts = async () => {
    const [allProductsSearch] = await getAll();
    return allProductsSearch;
};

const prodId = async (id) => {
    const [oneProductSearch] = await getProductId(id);

    if (oneProductSearch.length === 0) return true;

    return oneProductSearch;
};

const insertProd = (name, quantity) => {
    const newProduct = insertProduct(name, quantity);
    return newProduct;
};

module.exports = {
    getAllProducts,
    prodId,
    insertProd,
};