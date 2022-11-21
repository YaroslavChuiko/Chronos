const LOGIN_LENGTH = { min: 4, max: 20 };
const PASSWORD_LENGTH = { min: 8, max: 20 };
const EVENT_NAME_LENGTH = { min: 5, max: 20 };
const COLOR_PATTERN = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

const EVENT_TYPE_ENUM = {
  arrangement: 'arrangement',
  reminder: 'reminder',
  task: 'task',
};

export { LOGIN_LENGTH, PASSWORD_LENGTH, EVENT_NAME_LENGTH, COLOR_PATTERN, EVENT_TYPE_ENUM };
