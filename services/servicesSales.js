const { 
    allSalesDB,
    getSalesId, 
    insertSales, 
    insertSalesProduct,
    updateSaleQtd,
} = require('../models/modelsSales');

const getAllSales = async () => {
    const [allSalesSearch] = await allSalesDB();
    return allSalesSearch;
};

const salesId = async (id) => {
    const [oneSalesSearch] = await getSalesId(id);

    if (oneSalesSearch.length === 0) return true;

    return oneSalesSearch;
};

const insertedSalesProduct = async (saleArray) => {
    const saleId = await insertSales(saleArray);
    
    saleArray.map(async (saleItem) => {
        await insertSalesProduct(saleId, saleItem.productId, saleItem.quantity);
    });
    
    return {
        id: saleId,
        itemsSold: saleArray,
    };
};

const updateSales = async ({ id, productId, quantity }) => {
    const toSaleModel = await updateSaleQtd(id, productId, quantity);
    return toSaleModel;
};

module.exports = {
    getAllSales,
    salesId,
    insertedSalesProduct,
    updateSales,
};