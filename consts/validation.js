const NAME_LENGTH = { min: 4, max: 20 };
const PASSWORD_LENGTH = { min: 8, max: 20 };
const CALENDAR_NAME_LENGTH = { min: 5, max: 100 };
const CALENDAR_DESCRIPTION_LENGTH = { min: 10, max: 100 };
const COLOR_PATTERN = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

const ROLES = {
  admin: 'admin',
  guest: 'guest',
  moderator: 'moderator',
};

const EVENT_TYPE_ENUM = {
  arrangement: 'arrangement',
  reminder: 'reminder',
  task: 'task',
};

module.exports = {
  NAME_LENGTH,
  PASSWORD_LENGTH,
  ROLES,
  EVENT_TYPE_ENUM,
  CALENDAR_NAME_LENGTH,
  CALENDAR_DESCRIPTION_LENGTH,
  COLOR_PATTERN,
};
