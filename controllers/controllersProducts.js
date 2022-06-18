const servicersProducts = require('../services/servicersProducts');

const getAllProd = async (_req, res) => {
    const resultDB = await servicersProducts.getAllProducts();
    return res.status(200).json(resultDB);
};

const getOneProduct = async (req, res) => {
    const { id } = req.params;
    // console.log(id);
    const getProductById = await servicersProducts.prodId(id);
    if (getProductById.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(getProductById[0]);
};

const insertNewProduct = async (req, res) => {
    const { name, quantity } = req.body;
    
    const resultDB = await servicersProducts.getAllProducts();
    const resultSearchName = resultDB.find((item) => item.name === name);
    
    if (resultSearchName) {
        return res.status(409).json({ message: 'Product already exists' });
    }

    const returnInserction = await servicersProducts.insertProd(name, quantity);
    // console.log(returnInserction);
    
    return res.status(201).json({ id: returnInserction[0].insertId, name, quantity });
    // return res.status(201).json(resultSearchName);
};

const upDateNewProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const resultDB = await servicersProducts.prodId(id);
    if (resultDB.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }

    await servicersProducts.upDateById(name, quantity, id);
    const ObjUpDate = {
        id,
        name,
        quantity,
    };
    // console.log('obj', ObjUpDate);
     return res.status(200).json(ObjUpDate);
};

const dbDelete = async (req, res) => {
    const { id } = req.params;

    const resultDB = await servicersProducts.prodId(id);
    if (resultDB.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }
    await servicersProducts.deleteProductById(id);
    return res.status(204).end(); 
};

module.exports = {
    getAllProd,
    getOneProduct,
    insertNewProduct,
    upDateNewProduct,
    dbDelete,
};