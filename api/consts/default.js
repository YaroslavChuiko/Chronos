const { HOLIDAY_TYPE } = require('./validation');

const DEFAULT_CALENDAR = {
  name: 'Main Calendar',
  description: 'This is your main calendar.',
};

const DEFAULT_COLOR = '#ECC94B';

const DEFAULT_HOLIDAY = ({ name, date }) => ({
  color: DEFAULT_COLOR,
  content: '',
  type: HOLIDAY_TYPE,
  name,
  start: date,
  end: date,
});

const SEVEN_DAYS = 604800000;

const COOKIE_OPTIONS = {
  maxAge: SEVEN_DAYS,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain: 'localhost',
};

module.exports = { DEFAULT_CALENDAR, DEFAULT_HOLIDAY, COOKIE_OPTIONS, DEFAULT_COLOR };
