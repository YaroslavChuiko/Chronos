const ServerError = require('~/helpers/error');
const { user } = require('~/lib/prisma');
const Token = require('~/services/token');

const authenticate = async (req, _res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  const data = Token.validate(token);
  if (!data) {
    return next(new ServerError(401, 'The access token is invalid or has expired.'));
  }

  const found = await user.findUnique({ where: { id: data.id } });
  if (!found) {
    return next(new ServerError(404, `The user with the ${data.id} id was not found.`));
  }

  req.user = found;
  next();
};

module.exports = authenticate;
