/**
 * Handlers uncaught errors in the app
 * @function ErrorHandler
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {(function|object)} Function next() or JSON object
 * Gotten from Express Documentation
 */

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).send(err.message);
};

export default errorHandler;
