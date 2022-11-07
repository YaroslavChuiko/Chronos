const logger = require('~/logger/logger');

const errorMiddleware = (error, req, res, next) => {
  logger.error(error);
  res.status(error.metadata.status || 500).json({
    message: error.message || 'A server-side error occurred.',
  });
};

module.exports = errorMiddleware;
