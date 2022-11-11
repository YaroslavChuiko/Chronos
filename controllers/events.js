const { ROLES } = require('~/consts/validation');
const { checkEventAction, checkCalendarAction } = require('~/helpers/action-checks');
const { event, calendarEvents, userEvents } = require('~/lib/prisma');

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

module.exports = { createEvent, deleteEvent, updateEvent };
