const express = require('express');

const validateProduct = require('../middlewares/validateProduct');

const controlersProducts = require('../controllers/controlersProducts');

const routes = express.Router();

routes.get('/', controlersProducts.getAllProd);
routes.get('/:id', controlersProducts.getOneProduct);

routes.post('/', validateProduct, controlersProducts.insertNewProduct);

module.exports = routes;