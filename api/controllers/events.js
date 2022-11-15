const templates = require('~/consts/email');
const { ROLES } = require('~/consts/validation');
const { checkEventAction, checkCalendarAction } = require('~/helpers/action-checks');
const ServerError = require('~/helpers/server-error');
const { event, calendarEvents, userEvents, user, calendar } = require('~/lib/prisma');
const { Token, Email, Factory } = require('~/services');
const { getEventFilters } = require('~/helpers/filtering');

const getCalendarEvents = async (req, res) => {
  const calendarId = Number(req.params.id);
  const userId = req.user.id;

  const filters = getEventFilters(req.query);

  await checkCalendarAction(calendarId, userId, Object.values(ROLES));

  const events = await Factory.findMany(
    event,
    {
      users: {
        some: { user: { id: userId } },
      },
      calendars: {
        some: { calendar: { id: calendarId } },
      },
      ...filters,
    },
    null,
  );

  res.json(events);
};

const createEvent = async (req, res) => {
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

const deleteEvent = async (req, res) => {
  const calendarId = Number(req.params.id);
  const eventId = Number(req.params.eventId);
  const userId = req.user.id;
  const { admin, guest } = ROLES;

  await checkCalendarAction(calendarId, userId, Object.values(ROLES));
  const { role } = await checkEventAction(eventId, userId, [admin, guest]);

  if (role === admin) {
    await event.delete({ where: { id: eventId } });
  }

  if (role === guest) {
    await Promise.all([
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

const updateEvent = async (req, res) => {
  const data = req.body;
  const eventId = Number(req.params.eventId);
  const userId = req.user.id;

  await checkEventAction(eventId, userId, [ROLES.admin]);

  const updatedEvent = await event.update({
    where: { id: eventId },
    data,
  });

  res.status(201).json(updatedEvent);
};

const shareEvent = async (req, res) => {
  const eventId = Number(req.params.id);
  const { login, id } = req.user;
  const { email } = req.body;

  const { id: userId } = await Factory.exists(user, { email });

  await checkEventAction(eventId, id, [ROLES.admin]);

  const exists = await userEvents.findUnique({
    where: {
      userId_eventId: { userId, eventId },
    },
  });
  if (exists) {
    throw new ServerError(400, 'This user already has access to the calendar.');
  }

  await user.update({
    where: { id: userId },
    data: {
      events: {
        create: {
          role: ROLES.guest,
          isConfirmed: false,
          event: { connect: { id: eventId } },
        },
      },
    },
  });

  const token = Token.generateConfirmToken({ userId, eventId });
  await Email.sendMail(email, templates.EVENT_INVITE_CONFIRM, { login, token });

  res.sendStatus(204);
};

const confirmEvent = async (req, res) => {
  const { token } = req.params;
  const data = Token.validate(token);

  if (!data || !data.eventId || !data.userId) {
    throw new ServerError(400, 'The confirm token is invalid.');
  }
  const { userId, eventId } = data;

  const { id: calendarId } = await calendar.findFirst({
    where: {
      users: {
        some: {
          user: { id: userId },
          role: ROLES.moderator,
        },
      },
    },
  });

  await userEvents.update({
    where: { userId_eventId: { userId, eventId } },
    data: { isConfirmed: true },
  });

  await calendar.update({
    where: { id: calendarId },
    data: {
      events: {
        create: { event: { connect: { id: eventId } } },
      },
    },
  });

  res.sendStatus(204);
};

const getInvitedUsers = async (req, res) => {
  const id = Number(req.params.id);

  await Factory.exists(event, { id });

  const users = await user.findMany({
    where: {
      events: {
        some: {
          isConfirmed: false,
          event: { id },
        },
      },
    },
    select: { id: true, email: true },
  });

  res.json(users);
};

module.exports = {
  getCalendarEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  shareEvent,
  confirmEvent,
  getInvitedUsers,
};
