const validateQuantityMiddleware = (req, res, next) => {
    const { quantity } = req.body;

    if (!quantity) {
        return res.status(400).json({ message: '"quantity" is required' });
    }

    if (quantity < 0 || quantity === 0) {
        return res.status(422)
            .json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
};

module.exports = validateQuantityMiddleware;