const ServerError = require('~/helpers/server-error');
const { user } = require('~/lib/prisma');
const { Token, Factory } = require('~/services');

const authenticate = async (req, _res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  const data = Token.validate(token);
  if (!data) {
    return next(new ServerError(401, 'The access token is invalid or has expired.'));
  }

  const found = await Factory.exists(user, { id: data.id });

  req.user = found;
  next();
};

module.exports = authenticate;
