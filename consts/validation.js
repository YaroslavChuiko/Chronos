const NAME_LENGTH = { min: 4, max: 20 };
const PASSWORD_LENGTH = { min: 8, max: 20 };

const ROLE_ENUM = {
  admin: 'admin',
  guest: 'guest',
  moderator: 'moderator',
};

module.exports = { NAME_LENGTH, PASSWORD_LENGTH, ROLE_ENUM };
