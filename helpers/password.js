const bcrypt = require('bcrypt');

const comparePasswords = async (password, original) => {
  return await bcrypt.compare(password, original);
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

module.exports = { comparePasswords, hashPassword };
