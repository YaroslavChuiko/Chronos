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

  try {
    req.user = await Factory.exists(user, { id: data.id });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
