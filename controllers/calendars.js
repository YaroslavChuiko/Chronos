const templates = require('~/consts/email');
const { ROLES } = require('~/consts/validation');
const { checkCalendarAction } = require('~/helpers/action-checks');
const ServerError = require('~/helpers/server-error');
const { calendar, user, userCalendars } = require('~/lib/prisma');
const { Factory, Email, Token } = require('~/services');

const getCalendars = async (req, res) => {
  const { id } = req.user;

  const calendars = await Factory.findMany(
    calendar,
    {
      users: {
        some: { user: { id } },
      },
    },
    null,
  );

  res.json(calendars);
};

const getCalendarById = async (req, res) => {
  const id = Number(req.params.id);
  const { id: userId } = req.user;

  await checkCalendarAction(id, userId, Object.values(ROLES));

  const found = await Factory.findOne(calendar, id);

  res.json(found);
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
            role: ROLES.admin,
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
  const userId = req.user.id;

  await checkCalendarAction(calendarId, userId, [ROLES.admin]);

  const updatedCalendar = await calendar.update({
    where: { id: calendarId },
    data,
  });

  res.status(201).json(updatedCalendar);
};

const deleteCalendar = async (req, res) => {
  const calendarId = Number(req.params.id);
  const userId = req.user.id;

  await checkCalendarAction(calendarId, userId, [ROLES.admin]);

  const deletedCalendar = await calendar.delete({
    where: { id: calendarId },
  });

  res.json(deletedCalendar);
};

const getInvitedUsers = async (req, res) => {
  const id = Number(req.params.id);

  await Factory.exists(calendar, { id });

  const users = await Factory.findMany(
    user,
    {
      calendars: {
        some: {
          isConfirmed: false,
          calendar: { id },
        },
      },
    },
    { id: true, email: true },
  );

  res.json(users);
};

const shareCalendar = async (req, res) => {
  const calendarId = Number(req.params.id);
  const { login, id } = req.user;
  const { email } = req.body;

  const { id: userId } = await Factory.exists(user, { email });

  await checkCalendarAction(calendarId, id, [ROLES.admin]);

  const exists = await userCalendars.findUnique({
    where: {
      userId_calendarId: { calendarId, userId },
    },
  });
  if (exists) {
    throw new ServerError(400, 'This user already has access to the calendar.');
  }

  await Factory.update(user, userId, {
    calendars: {
      create: {
        role: ROLES.guest,
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
  getCalendars,
  getCalendarById,
  createCalendar,
  updateCalendar,
  deleteCalendar,
  shareCalendar,
  confirmCalendar,
  getInvitedUsers,
};
