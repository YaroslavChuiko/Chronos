const { event, userCalendars, calendar, userEvents } = require('~/lib/prisma');
const { Factory } = require('~/services');

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

module.exports = { checkCalendarAction, checkEventAction };
