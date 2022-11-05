const errorBoundary = require('~/middleware/error-boundary');
const errorMiddleware = require('~/middleware/error-response');

module.exports = { errorBoundary, errorMiddleware };
