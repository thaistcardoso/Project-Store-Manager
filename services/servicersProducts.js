const { getAll, getProductId } = require('../models/modelProducts');

const getAllProducts = async () => {
    const [allProductsSearch] = await getAll();
    return allProductsSearch;
};

const prodId = async (id) => {
    const [oneProductSearch] = await getProductId(id);

    // const erroMessage = { status: 400, message: 'Product not found' };
    // if (oneProductSearch.length === 0) throw erroMessage;

    return oneProductSearch;
};

module.exports = {
    getAllProducts,
    prodId,
};