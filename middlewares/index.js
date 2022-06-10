const errorHandler = require('./error.middlewares');
const validateName = require('./validateName');
const validateQuantity = require('./validateQuantity');

module.exports = {
    errorHandler,
    validateName,
    validateQuantity,
};