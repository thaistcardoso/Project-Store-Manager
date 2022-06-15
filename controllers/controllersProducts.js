const {
    getAllProducts,
    prodId,
    insertProd,
    upDateById,
    deleteProductById,
} = require('../services/servicersProducts');

const getAllProd = async (_req, res) => {
    const resultDB = await getAllProducts();
    return res.status(200).json(resultDB);
};

const getOneProduct = async (req, res) => {
    const { id } = req.params;
    const getProductById = await prodId(id);
    if (getProductById.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(getProductById[0]);
};

const insertNewProduct = async (req, res) => {
    const { name, quantity } = req.body;
    
    const resultDB = await getAllProducts();
    const resultSearchName = resultDB.find((item) => item.name === name);
    
    if (resultSearchName) {
        return res.status(409).json({ message: 'Product already exists' });
    }

    const newProductInserction = await insertProd(name, quantity);
    
    return res.status(201).json({ id: newProductInserction[0].insertId, name, quantity });
    // return res.status(201).json(resultSearchName);
};

const upDateNewProduct = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const resultDB = await prodId(id);
    if (resultDB.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }

    await upDateById(name, quantity, id);
    const ObjUpDate = {
        id,
        name,
        quantity,
    };
    console.log('obj', ObjUpDate);
     return res.status(200).json(ObjUpDate);
};

const dbDelete = async (req, res) => {
    const { id } = req.params;

    const resultDB = await prodId(id);
    if (resultDB.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
    }
    await deleteProductById(id);
    return res.status(204).end(); 
};

module.exports = {
    getAllProd,
    getOneProduct,
    insertNewProduct,
    upDateNewProduct,
    dbDelete,
};