const express = require('express');

const controlersProducts = require('../controllers/controlersProducts');

const routes = express.Router();

routes.get('/', controlersProducts.getAllProd);
routes.get('/:id', controlersProducts.getOneProduct);

module.exports = routes;