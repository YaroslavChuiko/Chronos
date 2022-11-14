const ServerError = require('~/helpers/server-error');

const validate =
  (joiSchema, resource = 'body') =>
  (req, _res, next) => {
    const data = req[resource];
    if (!data) {
      next(new ServerError(400, `Please provide a request ${resource}.`));
    }

    const { error } = joiSchema.validate(data);
    if (error) {
      next(new ServerError(400, error));
    }
    next();
  };

module.exports = validate;
