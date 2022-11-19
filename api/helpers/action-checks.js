const { DEFAULT_CALENDAR } = require('~/consts/default');
const { event, userCalendars, calendar, userEvents } = require('~/lib/prisma');
const { Factory } = require('~/services');
const ServerError = require('./server-error');

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

const checkCalendarName = (name) => {
  if (name.toLowerCase() === DEFAULT_CALENDAR.name.toLowerCase()) {
    throw new ServerError(400, "You cannot use the default calendar's name");
  }
};

module.exports = { checkCalendarAction, checkEventAction, checkCalendarName };
