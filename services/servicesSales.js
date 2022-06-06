const { allSalesDB, getSalesId } = require('../models/modelsSales');

const getAllSales = async () => {
    const [allSalesSearch] = await allSalesDB();
    return allSalesSearch;
};

const salesId = async (id) => {
    const [oneSalesSearch] = await getSalesId(id);

    return oneSalesSearch;
};

module.exports = {
    getAllSales,
    salesId,
};