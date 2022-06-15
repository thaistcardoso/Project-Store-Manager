const express = require('express');

const controllersSales = require('../controllers/controllersSales');

const route = express.Router();

route.get('/', controllersSales.allSales);

route.get('/:id', controllersSales.getOneSales);

route.post('/', controllersSales.insertSalesProduct);

route.put('/:id', controllersSales.updateSaleQtd);

module.exports = route;
//