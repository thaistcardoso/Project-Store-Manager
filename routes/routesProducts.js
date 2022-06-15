const express = require('express');

const { validateName, validateQuantity } = require('../middlewares/index');

const controllersProducts = require('../controllers/controllersProducts');

const routes = express.Router();

routes.get('/', controllersProducts.getAllProd);
routes.get('/:id', controllersProducts.getOneProduct);

routes.post('/', validateName, validateQuantity, controllersProducts.insertNewProduct);
routes.put('/:id', validateName, validateQuantity, controllersProducts.upDateNewProduct);
routes.delete('/:id', controllersProducts.dbDelete);

module.exports = routes;