const { user, userCalendars } = require('~/lib/prisma');

const User = {
  async userCalendarLink(calendarId, userId) {
    return userCalendars.findUnique({
      where: {
        userId_calendarId: { calendarId, userId },
      },
    });
  },
};

module.exports = User;
