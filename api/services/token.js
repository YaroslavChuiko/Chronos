const jwt = require('jsonwebtoken');

const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;

const Token = {
  generate(payload, options = {}) {
    const expiresIn = options.expiresIn || TOKEN_EXPIRES_IN;

    return jwt.sign(payload, TOKEN_SECRET, { expiresIn });
  },

  validate(token) {
    try {
      return jwt.verify(token || '', TOKEN_SECRET);
    } catch (_err) {
      return null;
    }
  },

  generateConfirmToken(payload) {
    return Token.generate(payload, { expiresIn: '1h' });
  },
};

module.exports = Token;
