const connection = require('../db');
require('dotenv').config();

const allSalesDB = () => connection
.execute(
`SELECT S.id AS saleId, S.date, SP.product_id AS productId, SP.quantity 
FROM sales AS S
INNER JOIN sales_products AS SP
ON SP.sale_id = S.id
ORDER BY SP.sale_id, SP.product_id;`,
);

const getSalesId = (id) => connection
.execute(
`SELECT S.date, SP.product_id AS productId, SP.quantity 
FROM sales AS S
INNER JOIN sales_products AS SP
ON SP.sale_id = S.id WHERE id = ?;`, [id],
);

const insertSales = async () => {
    await connection.execute(
        'INSERT INTO  StoreManager.sales (date) VALUES (now());',
    );
    const [saleDB] = await connection.execute(
        'SELECT id FROM StoreManager.sales ORDER BY id DESC LIMIT 1;',
    );
    console.log('saleDB', saleDB[0]);
    return saleDB[0];
};

const insertSalesProduct = async (saleId, productId, quantity) => {
    const insertSalesProductDb = await connection.execute(
        'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES(?, ?, ?);',
        [saleId, productId, quantity],
        );
        // console.log('models', insertSalesProductDb);
    return insertSalesProductDb;
};

const updateSaleQtd = async (id, productId, quantity) => {
    const saleQtd = await connection.execute(
        'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?;',
        [quantity, id, productId],
    );
    return saleQtd;
};

const deleteSale = async (id) => {
    const deleteSalesDB = await connection.execute(
        'DELETE FROM StoreManager.sales WHERE id = ?;', [id],
    );
    return deleteSalesDB;
};

// const deleteSaleProduct = async (id) => {
//     const deleteSalesProductDB = await connection.execute(
//         'DELETE FROM StoreManager.sales_products WHERE sale_id = ?;', [id],
//     );
//     return deleteSalesProductDB;
// };

module.exports = {
    allSalesDB,
    getSalesId,
    insertSales,
    insertSalesProduct,
    updateSaleQtd,
    deleteSale,
    // deleteSaleProduct,
};
//