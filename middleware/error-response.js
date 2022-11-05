const logger = require('~/logger/logger');

const errorMiddleware = (error, req, res, next) => {
  logger.error(error);
  res.status(error.status || 500).json({
    message: error.message || 'A server-side error occurred.',
  });
};

module.exports = errorMiddleware;
