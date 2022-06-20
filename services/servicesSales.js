const {
    allSalesDB,
    getSalesId,
    insertSales,
    insertSalesProduct,
    updateSaleQtd,
    deleteSale,
} = require('../models/modelsSales');

const { getQuantityById, upDateQuantityProduct } = require('../models/modelProducts');

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
    const arrayQtdProductDB = await Promise.all(saleArray.map(({ productId }) =>
        getQuantityById(productId)));
        console.log(arrayQtdProductDB);
    const checkQuantity = arrayQtdProductDB.every(([[{ quantity }]], i) =>
        saleArray[i].quantity <= quantity);

    if (!checkQuantity) {
        return { error: true, message: 'Such amount is not permitted to sell' };
    }
    await Promise.all(arrayQtdProductDB.map(([[{ quantity }]], i) => {
        const newquantity = quantity - saleArray[i].quantity;
        return upDateQuantityProduct(newquantity, saleArray[i].productId);
    }));

    const saleId = await insertSales();
    saleArray.map(async (saleItem) => {
        await insertSalesProduct(saleId, saleItem.productId, saleItem.quantity);
    });

    return { id: saleId, itemsSold: saleArray };
};

const updateSales = async ({ id, productId, quantity }) => {
    const toSaleModel = await updateSaleQtd(id, productId, quantity);
    return toSaleModel;
};

const salesDelete = async (id) => {
    const [saleArray] = await getSalesId(id);
    const arrayQtdProductDB = await Promise.all(saleArray.map(({ productId }) =>
    getQuantityById(productId)));

    await Promise.all(arrayQtdProductDB.map(([[{ quantity }]], i) => {
        const newquantity = quantity + saleArray[i].quantity;
        return upDateQuantityProduct(newquantity, saleArray[i].productId);
    }));

    const toSaleDelete = await deleteSale(id);
    return toSaleDelete;
};

module.exports = {
    getAllSales,
    salesId,
    insertedSalesProduct,
    updateSales,
    salesDelete,
};
//