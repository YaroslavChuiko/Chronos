const { ROLE_ENUM } = require('~/consts/validation');
const { DEFAULT_CALENDAR, COOKIE_OPTIONS } = require('~/consts/default');
const { user } = require('~/lib/prisma');
const ServerError = require('~/helpers/error');
const { hashPassword, comparePasswords } = require('~/helpers/password');
const boundary = require('~/middleware/error-boundary');
const Token = require('~/services/token');

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

  const { id } = await user.create({
    data: {
      ...data,
      calendars: {
        create: {
          role: ROLE_ENUM.moderator,
          calendar: { create: DEFAULT_CALENDAR },
        },
      },
    },
  });

  res.json({ id });
};

const login = async (req, res) => {
  const { login, password } = req.body;

  const found = await user.findUnique({
    where: { login },
  });

  if (!found) {
    throw new ServerError(404, 'The user was not found.');
  }

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

  const found = await user.findUnique({ where: { id: data.id } });
  if (!found) {
    throw new ServerError(404, "The user doesn't exist.");
  }

  const { accessToken, refreshToken } = generateUserTokens(found);

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.json({ accessToken });
};

const logout = async (_req, res) => {
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};

module.exports = {
  register: boundary(register),
  login: boundary(login),
  refresh: boundary(refresh),
  logout: boundary(logout),
};
