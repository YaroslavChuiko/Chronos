const templates = require('~/consts/email');
const { ROLE } = require('~/consts/validation');
const ServerError = require('~/helpers/server-error');
const { calendar, user, userCalendars, event, userEvents, calendarEvents } = require('~/lib/prisma');
const { Factory, Email, User, Token } = require('~/services');

const authorCheck = async (req, _res, next) => {
  const { id: userId } = req.user;
  const calendarId = Number(req.params.id);

  const toCheck = await User.userCalendarLink(calendarId, userId);
  if (!toCheck || toCheck.role !== ROLE.calendar.admin) {
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
            role: ROLE.calendar.admin,
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

const createCalendarEvent = async (req, res) => {
  const data = req.body;
  const calendarId = Number(req.params.id);
  const { id: userId } = req.user;
  const { admin, moderator } = ROLE.calendar;

  const exist = await calendar.findUnique({ where: { id: calendarId } });
  if (!exist) {
    throw new ServerError(404, 'The calendar does not exist.');
  }

  const toCheck = await userCalendars.findUnique({ where: { userId_calendarId: { userId, calendarId } } });
  if (!toCheck || (toCheck.role !== admin && toCheck.role !== moderator)) {
    throw new ServerError(403, 'You do not have the rights to perform this action.');
  }

  const newEvent = await event.create({
    data: {
      ...data,
      users: {
        create: {
          role: ROLE.event.admin,
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
  const { id: userId } = req.user;

  //! check is calendar exist
  //! check role in calendar

  const exist = await event.findUnique({ where: { id: eventId } });
  if (!exist) {
    throw new ServerError(404, 'The event does not exist.');
  }

  const toCheck = await userEvents.findUnique({ where: { userId_eventId: { userId, eventId } } });
  if (!toCheck) {
    throw new ServerError(403, 'You do not have the rights to perform this action.');
  }

  if (toCheck.role === ROLE.event.admin) {
    await event.delete({ where: { id: eventId } });
  }

  if (toCheck.role === ROLE.event.guest) {
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
        role: ROLE.calendar.admin,
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
  authorCheck,
};
