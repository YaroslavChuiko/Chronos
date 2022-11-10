const { createLogger, transports, format: fmtOptions } = require('winston');

const logger = createLogger({
  format: fmtOptions.combine(
    fmtOptions.errors({
      stack: true,
    }),
    fmtOptions.metadata(),
    fmtOptions.prettyPrint(),
  ),
  silent: process.env.NODE_ENV === 'production',
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
  ],
});

module.exports = logger;
