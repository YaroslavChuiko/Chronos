const serverInit = require('~/server/init');
const logger = require('~/logger/logger');

const serverSetup = async (app) => {
  serverInit(app);

  app.listen(process.env.SERVER_PORT, () => {
    logger.info(`Server is running on port ${process.env.SERVER_PORT}`);
  });
};

module.exports = serverSetup;
