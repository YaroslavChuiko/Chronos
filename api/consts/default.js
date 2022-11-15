const { HOLIDAY_TYPE } = require('./validation');

const DEFAULT_CALENDAR = {
  name: 'Main Calendar',
  description: 'This is your main calendar.',
};

const DEFAULT_HOLIDAY = ({ name, date }) => ({
  color: '#fff',
  content: '',
  type: HOLIDAY_TYPE,
  name,
  startAt: date,
});

const SEVEN_DAYS = 604800000;

const COOKIE_OPTIONS = {
  maxAge: SEVEN_DAYS,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain: 'localhost',
};

module.exports = { DEFAULT_CALENDAR, DEFAULT_HOLIDAY, COOKIE_OPTIONS };
