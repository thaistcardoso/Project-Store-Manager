const express = require('express');

const { validateName, validateQuantity } = require('../middlewares/index');

const controlersProducts = require('../controllers/controlersProducts');

const routes = express.Router();

routes.get('/', controlersProducts.getAllProd);
routes.get('/:id', controlersProducts.getOneProduct);

routes.post('/', validateName, validateQuantity, controlersProducts.insertNewProduct);
routes.put('/:id', validateName, validateQuantity, controlersProducts.upDateNewProduct);

module.exports = routes;