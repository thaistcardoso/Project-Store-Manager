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

const insertSales = async (salesId, productId, quantity) => {
    const insertSalesDb = await connection.execute(
        'INSERT INTO StoreManager.sales_product (sales_id, product_id, quantity) VALUES(?, ?, ?);',
        [salesId, productId, quantity],
    );
    return insertSalesDb;
};

module.exports = {
    allSalesDB,
    getSalesId,
    insertSales,
};