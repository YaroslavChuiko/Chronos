const templates = require('~/consts/email');
const { ROLE_ENUM } = require('~/consts/validation');
const ServerError = require('~/helpers/server-error');
const { calendar, user, userCalendars } = require('~/lib/prisma');
const { Factory, Email, User, Token } = require('~/services');

const authorCheck = async (req, _res, next) => {
  const { id: userId } = req.user;
  const calendarId = Number(req.params.id);

  const toCheck = await User.userCalendarLink(calendarId, userId);
  if (!toCheck || toCheck.role !== ROLE_ENUM.admin) {
    return next(new ServerError(403, 'You do not have the rights to perform this action.'));
  }

  next();
};

const createCalendar = async (req, res) => {
  const data = req.body;
  const { id } = req.user;

  const newCalendar = await calendar.create({
    data: {
      ...data,
      users: {
        create: [
          {
            user: { connect: { id } },
            role: ROLE_ENUM.admin,
          },
        ],
      },
    },
  });

  res.status(201).json(newCalendar);
};

const updateCalendar = async (req, res) => {
  const data = req.body;
  const calendarId = Number(req.params.id);

  const exist = await calendar.findUnique({ where: { id: calendarId } });
  if (!exist) {
    throw new ServerError(404, 'The calendar does not exist.');
  }

  const updatedCalendar = await calendar.update({
    where: { id: calendarId },
    data,
  });

  res.status(201).json(updatedCalendar);
};

const deleteCalendar = async (req, res) => {
  const calendarId = Number(req.params.id);

  const exist = await calendar.findUnique({ where: { id: calendarId } });
  if (!exist) {
    throw new ServerError(404, 'The calendar does not exist.');
  }

  const deletedCalendar = await calendar.delete({
    where: { id: calendarId },
  });

  res.json(deletedCalendar);
};

const getInvitedUsers = async (req, res) => {
  const calendarId = Number(req.params.id);

  const users = await Factory.findMany(
    user,
    {
      calendars: {
        some: {
          isConfirmed: false,
          calendar: { id: calendarId },
        },
      },
    },
    { id: true, email: true },
  );

  res.json(users);
};

const shareCalendar = async (req, res) => {
  const calendarId = Number(req.params.id);
  const { login } = req.user;
  const { email } = req.body;

  const { id: userId } = await Factory.exists(user, { email });

  const exists = await User.userCalendarLink(calendarId, userId);
  if (exists) {
    throw new ServerError(400, 'This user already has access to the calendar.');
  }

  await Factory.update(user, userId, {
    calendars: {
      create: {
        role: ROLE_ENUM.guest,
        isConfirmed: false,
        calendar: {
          connect: { id: calendarId },
        },
      },
    },
  });

  const token = Token.generateConfirmToken({ userId, calendarId });
  await Email.sendMail(email, templates.CALENDAR_INVITE_CONFIRM, { login, token });

  res.sendStatus(204);
};

const confirmCalendar = async (req, res) => {
  const { token } = req.params;
  const data = Token.validate(token);

  if (!data || !data.calendarId || !data.userId) {
    throw new ServerError(400, 'The confirm token is invalid.');
  }
  const { userId, calendarId } = data;

  await userCalendars.update({
    where: {
      userId_calendarId: { userId, calendarId },
    },
    data: { isConfirmed: true },
  });

  res.sendStatus(204);
};
module.exports = {
  createCalendar,
  updateCalendar,
  deleteCalendar,
  shareCalendar,
  confirmCalendar,
  getInvitedUsers,
  authorCheck,
};
