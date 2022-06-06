const { getAllProducts, prodId } = require('../services/servicersProducts');

const getAllProd = async (req, res) => {
    const resultDB = await getAllProducts();
    return res.status(200).json(resultDB);
};

const getOneProduct = async (req, res) => {
    const { id } = req.params;
    const oneProductresult = await prodId(id);
    return res.status(200).json(oneProductresult); 
};

module.exports = {
    getAllProd,
    getOneProduct,
};