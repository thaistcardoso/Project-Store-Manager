const servicersSales = require('../services/servicesSales');

const allSales = async (req, res) => {
    const resultSalesDB = await servicersSales.getAllSales();
    return res.status(200).json(resultSalesDB);
};

const getOneSales = async (req, res) => {
    const { id } = req.params;
    const oneSalesresult = await servicersSales.salesId(id);
    if (oneSalesresult === true) {
        return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(oneSalesresult); 
};

const insertSalesProduct = async (req, res) => {
    const addSaleProduct = await servicersSales.insertedSalesProduct(req.body);
    // console.log('constrolers', addSaleProduct);
    return res.status(201).json(addSaleProduct); 
};

const updateSaleQtd = async (req, res) => {
    const { id } = req.params;

    const searchId = await servicersSales.salesId(id);
    if (searchId === true) {
        return res.status(404).json({ message: 'Sale not found' });
    }

    await servicersSales.updateSales({ ...req.body[0], id });
    const obj = {
        saleId: id,
        itemUpdated: req.body,
    };
    res.status(200).json(obj);
};

const deleteSaleId = async (req, res) => {
    const { id } = req.params;
    const oneSalesresult = await servicersSales.salesId(id);
    if (oneSalesresult === true) {
        return res.status(404).json({ message: 'Sale not found' });
    }

    await servicersSales.salesDelete(id);
    return res.status(204).end();
};

module.exports = {
    allSales,
    getOneSales,
    insertSalesProduct,
    updateSaleQtd,
    deleteSaleId,
};
//