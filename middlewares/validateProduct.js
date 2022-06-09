const validateProductMiddleware = (req, res, next) => {
    const { name, quantity } = req.body;
    // console.log('middleware', name, quantity);
    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }

    if (name < 5) {
        return res.status(422)
            .json({ message: '"name" length must be at least 5 characters long' });
    }
    if (!quantity) {
        return res.status(400).json({ message: '"quantity" is required' });
    }

    if (quantity < 1) {
        return res.status(422)
            .json({ message: '"quantity" length must be at least 1 characters long' });
    }
    next();
};

module.exports = validateProductMiddleware;

// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages