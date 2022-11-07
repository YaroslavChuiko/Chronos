const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET;
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;

const Token = {
  generate(payload, options = {}) {
    const expiresIn = options.expiresIn || TOKEN_EXPIRES_IN;

    return jwt.sign(payload, TOKEN_SECRET, { expiresIn });
  },

  validate(token) {
    try {
      return jwt.verify(token, TOKEN_SECRET);
    } catch (_err) {
      return null;
    }
  },
};

module.exports = Token;
