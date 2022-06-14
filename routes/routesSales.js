const express = require('express');

const controlersSales = require('../controllers/controlersSales');

const route = express.Router();

route.get('/', controlersSales.allSales);

route.get('/:id', controlersSales.getOneSales);

route.post('/', controlersSales.insertSalesProduct);

route.put('/:id', controlersSales.updateSaleQtd);

module.exports = route;
//