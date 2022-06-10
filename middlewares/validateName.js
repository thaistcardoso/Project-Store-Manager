const validateNameMiddleware = (req, res, next) => {
    const { name } = req.body;
    // console.log('middleware', name, quantity);
    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }

    if (name.length < 5) {
        return res.status(422)
            .json({ message: '"name" length must be at least 5 characters long' });
    }
    next();
};

module.exports = validateNameMiddleware;

// https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages