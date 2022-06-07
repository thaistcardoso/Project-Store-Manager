const { getAll, getProductId } = require('../models/modelProducts');

const getAllProducts = async () => {
    const [allProductsSearch] = await getAll();
    return allProductsSearch;
};

const prodId = async (id) => {
    const [oneProductSearch] = await getProductId(id);

    if (oneProductSearch.length === 0) return true;

    return oneProductSearch;
};

module.exports = {
    getAllProducts,
    prodId,
};