const errorHandler = (error, req, res, next) => {
    res.status(error.status || 500).json({ message: error.message || 'Tente mais tarde' });
    next();
};

module.exports = errorHandler;