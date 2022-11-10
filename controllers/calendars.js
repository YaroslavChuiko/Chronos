const templates = require('~/consts/email');
const { ROLES } = require('~/consts/validation');
const ServerError = require('~/helpers/server-error');
const { calendar, user, userCalendars, event, userEvents, calendarEvents } = require('~/lib/prisma');
const { Factory, Email, User, Token } = require('~/services');

const checkCalendarAction = async (calendarId, userId, roles) => {
  await Factory.exists(calendar, { id: calendarId });

  const where = { userId_calendarId: { calendarId, userId } };
  await Factory.hasRights(userCalendars, where, roles);
};

const checkEventAction = async (eventId, userId, roles) => {
  await Factory.exists(event, { id: eventId });

  const where = { userId_eventId: { eventId, userId } };
  return Factory.hasRights(userEvents, where, roles);
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

const createCalendarEvent = async (req, res) => {
  const data = req.body;
  const calendarId = Number(req.params.id);
  const userId = req.user.id;
  const { admin, moderator } = ROLES;

  await checkCalendarAction(calendarId, userId, [admin, moderator]);

  const newEvent = await event.create({
    data: {
      ...data,
      users: {
        create: {
          role: ROLES.admin,
          user: { connect: { id: userId } },
        },
      },
      calendars: {
        create: {
          calendar: { connect: { id: calendarId } },
        },
      },
    },
  });

  res.status(201).json(newEvent);
};

const deleteCalendarEvent = async (req, res) => {
  const calendarId = Number(req.params.calendarId);
  const eventId = Number(req.params.eventId);
  const userId = req.user.id;
  const { admin, guest, moderator } = ROLES;

  await checkCalendarAction(calendarId, userId, [admin, guest, moderator]);
  const { role } = await checkEventAction(eventId, userId, [admin, guest]);

  if (role === admin) {
    await event.delete({ where: { id: eventId } });
  }

  if (role === guest) {
    Promise.all([
      calendarEvents.delete({
        where: { calendarId_eventId: { calendarId, eventId } },
      }),
      userEvents.delete({
        where: { userId_eventId: { userId, eventId } },
      }),
    ]);
  }

  res.sendStatus(204);
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

  await checkCalendarAction(calendarId, id, [ROLES.admin]);

  const { id: userId } = await Factory.exists(user, { email });

  const exists = await User.userCalendarLink(calendarId, userId);
  if (exists) {
    throw new ServerError(400, 'This user already has access to the calendar.');
  }

  await Factory.update(user, userId, {
    calendars: {
      create: {
        role: ROLES.admin,
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
  createCalendarEvent,
  deleteCalendarEvent,
  shareCalendar,
  confirmCalendar,
  getInvitedUsers,
};
