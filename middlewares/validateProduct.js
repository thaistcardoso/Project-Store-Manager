const Joi = require('joi');

const validateProduct = Joi.object({
    name: Joi.string().min(5).required().messages({
        'string.min': '{{#label}} length must be at least 5 characters long',
    }),

    quantity: Joi.number().min(1).required().messages({
        'string.min': '{{#label}} must be greater than or equal to 1',
    }),
})
    .messages({
        'any.required': '{{#label}} is required0 ',
    });

const validateProductMiddleware = (req, res, next) => {
    const { error } = validateProduct.validate(req.body, { abortEarly: false });
    const { name, quantity } = req.body;
    if (error.message.includes('required')) {
        return res.status(400).json({ messages: error.message });
    }

    if (name < 5 || quantity < 1) {
        return res.status(422).json({ message: error.message });
    }
    next();
};

module.exports = validateProductMiddleware;

// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages