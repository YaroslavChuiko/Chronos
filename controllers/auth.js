const { ROLE } = require('~/consts/validation');
const { DEFAULT_CALENDAR, COOKIE_OPTIONS } = require('~/consts/default');
const { user } = require('~/lib/prisma');
const ServerError = require('~/helpers/server-error');
const { hashPassword, comparePasswords } = require('~/helpers/password');
const { Token, Factory } = require('~/services');

const checkFor = async (key, value) => {
  const exists = await user.findUnique({ where: { [key]: value } });
  if (exists) {
    throw new ServerError(400, `The user with this ${key} already exists.`);
  }
};

const generateUserTokens = (data) => {
  const { id, email, login } = data;
  const accessToken = Token.generate({ id, email, login });
  const refreshToken = Token.generate({ id }, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

const register = async (req, res) => {
  const data = req.body;

  await checkFor('login', data.login);
  await checkFor('email', data.email);

  data.password = await hashPassword(data.password);

  const { id } = await Factory.create(user, {
    ...data,
    calendars: {
      create: {
        role: ROLE.calendar.moderator,
        calendar: { create: DEFAULT_CALENDAR },
      },
    },
  });

  res.json({ id });
};

const login = async (req, res) => {
  const { login, password } = req.body;

  const found = await Factory.exists(user, { login });

  const isAuthorized = await comparePasswords(password, found.password);
  if (!isAuthorized) {
    throw new ServerError(401, 'The password is not correct.');
  }

  const { accessToken, refreshToken } = generateUserTokens(found);

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.json({ accessToken });
};

const refresh = async (req, res) => {
  const { refreshToken: token } = req.cookies;

  const data = Token.validate(token);
  if (!data || !data.id) {
    throw new ServerError(400, 'The refresh token is invalid.');
  }

  const found = await Factory.exists(user, { id: data.id });
  const { accessToken, refreshToken } = generateUserTokens(found);

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.json({ accessToken });
};

const logout = async (_req, res) => {
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};

module.exports = { register, login, refresh, logout };
