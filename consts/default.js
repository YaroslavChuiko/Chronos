const DEFAULT_CALENDAR = {
  name: 'Main Calendar',
  description: 'This is your main calendar.',
};

const SEVEN_DAYS = 604800000;

const COOKIE_OPTIONS = {
  maxAge: SEVEN_DAYS,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  domain: 'localhost',
};

module.exports = { DEFAULT_CALENDAR, COOKIE_OPTIONS };
