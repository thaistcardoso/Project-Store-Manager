const { allSalesDB, getSalesId } = require('../models/modelsSales');

// const saleObjId = {
//     saleId: getSalesId.id,
//     productId: getSalesId.product_id,
//     quantity: getSalesId.quantity,
//     date: getSalesId.date,
// };
// const saleObj = {
//     productId: getSalesId.product_id,
//     quantity: getSalesId.quantity,
//     date: getSalesId.date,
// };

const getAllSales = async () => {
    const [allSalesSearch] = await allSalesDB();
    return allSalesSearch;
};

const salesId = async (id) => {
    const [oneSalesSearch] = await getSalesId(id);

    if (oneSalesSearch.length === 0) return true;

    return oneSalesSearch;
};

module.exports = {
    getAllSales,
    salesId,
};