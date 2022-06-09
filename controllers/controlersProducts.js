const {
    getAllProducts,
    prodId,
    insertProd,
} = require('../services/servicersProducts');

const getAllProd = async (req, res) => {
    const resultDB = await getAllProducts();
    return res.status(200).json(resultDB);
};

const getOneProduct = async (req, res) => {
    const { id } = req.params;
    const oneProductresult = await prodId(id);
    if (oneProductresult === true) {
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(oneProductresult[0]);
};

const insertNewProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const newProductInserction = await insertProd(name, quantity);

    const resultDB = await getAllProducts();
    const resultSearchName = resultDB.find((item) => item.name === name);
    // console.log('controlers', { id: newProductInserction[0].insertId, name, quantity });
    // console.log(resultSearchName);
   
    if (resultSearchName) {
        return res.status(409).json({ message: 'Product already exists' });
    }

    return res.status(201).json({ id: newProductInserction[0].insertId, name, quantity });
    // return res.status(201).json(resultSearchName);
};

module.exports = {
    getAllProd,
    getOneProduct,
    insertNewProduct,
};