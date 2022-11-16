const { ROLES } = require('~/consts/validation');
const { DEFAULT_CALENDAR, COOKIE_OPTIONS } = require('~/consts/default');
const { user } = require('~/lib/prisma');
const ServerError = require('~/helpers/server-error');
const { hashPassword, comparePasswords } = require('~/helpers/password');
const { Token, Factory, Email } = require('~/services');
const templates = require('~/consts/email');

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
        role: ROLES.moderator,
        calendar: { create: DEFAULT_CALENDAR },
      },
    },
  });
  const { email, login } = data;
  const token = Token.generateConfirmToken({ id });
  await Email.sendMail(email, templates.EMAIL_CONFIRM, { login, token });

  res.json({ id });
};

const login = async (req, res) => {
  const { login, password } = req.body;

  const found = await Factory.exists(user, { login });

  const isAuthorized = await comparePasswords(password, found.password);
  if (!isAuthorized) {
    throw new ServerError(400, 'The password is not correct.');
  }

  if (!found.isEmailConfirmed) {
    throw new ServerError(403, 'Please confirm your email.');
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

const confirmEmail = async (req, res) => {
  const { token } = req.params;
  const data = Token.validate(token);
  if (!data || !data.id) {
    throw new ServerError(400, 'The confirm token is invalid or has expired.');
  }

  await Factory.update(user, data.id, { isEmailConfirmed: true });

  res.json({ message: 'Email is confirmed.' });
};

module.exports = { register, login, refresh, logout, confirmEmail };
