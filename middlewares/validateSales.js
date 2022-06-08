const Joi = require('joi');

const validateSale = Joi.object({
    productId: Joi.number().min(1).required().messages({
        'string.min': '{{#label}} must be greater than or equal to 1',
    }),
    quantity: Joi.number().min(1).required().messages({
        'string.min': '{{#label}} must be greater than or equal to 1',
    }),
})
    .messages({
        'any.required': '{{#label}} is required0 ',
    });

const validateSaleMiddleware = (req, res, next) => {
    const { error } = validateSale.validate(req.body, { abortEarly: false });
    const { name, quantity } = req.body;
    if (error.message.includes('required')) {
        return res.status(400).json({ messages: error.message });
    }

    if (name < 5 || quantity < 1) {
        return res.status(422).json({ message: error.message });
    }
    next();
};

module.exports = validateSaleMiddleware;

// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages