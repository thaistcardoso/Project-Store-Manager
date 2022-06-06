const { getAllSales, salesId } = require('../services/servicesSales');

const allSales = async (req, res) => {
    const resultSalesDB = await getAllSales();
    return res.status(200).json(resultSalesDB);
};

const getOneSales = async (req, res) => {
    const { id } = req.params;
    const oneSalesresult = await salesId(id);
    return res.status(200).json(oneSalesresult); 
};

module.exports = {
    allSales,
    getOneSales,
};