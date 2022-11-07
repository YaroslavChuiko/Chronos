const ServerError = require('~/helpers/error');

const validate = (joiSchema) => (req, _res, next) => {
  const body = req.body;
  if (!body) {
    next(new ServerError(400, 'Please provide a request body.'));
  }

  const { error } = joiSchema.validate(body);
  if (error) {
    next(new ServerError(400, error));
  }
  next();
};

module.exports = validate;
