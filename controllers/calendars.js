const { ROLE_ENUM } = require('~/consts/validation');
const ServerError = require('~/helpers/server-error');
const { calendar, userCalendars } = require('~/lib/prisma');

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
  const { id: userId } = req.user;

  const exist = await calendar.findUnique({ where: { id: calendarId } });
  if (!exist) {
    throw new ServerError(404, 'The calendar does not exist.');
  }

  const junction = await userCalendars.findUnique({
    where: {
      userId_calendarId: {
        userId,
        calendarId,
      },
    },
  });
  if (!junction || junction.role !== ROLE_ENUM.admin) {
    throw new ServerError(403, "You don't have enough access rights.");
  }

  const updatedCalendar = await calendar.update({
    where: { id: calendarId },
    data,
  });

  res.status(201).json(updatedCalendar);
};

const deleteCalendar = async (req, res) => {
  const calendarId = Number(req.params.id);
  const { id: userId } = req.user;

  const exist = await calendar.findUnique({ where: { id: calendarId } });
  if (!exist) {
    throw new ServerError(404, 'The calendar does not exist.');
  }

  const junction = await userCalendars.findUnique({
    where: {
      userId_calendarId: {
        userId,
        calendarId,
      },
    },
  });
  if (!junction || junction.role !== ROLE_ENUM.admin) {
    throw new ServerError(403, "You don't have enough access rights.");
  }

  const deletedCalendar = await calendar.delete({
    where: { id: calendarId },
  });

  res.json(deletedCalendar);
};

module.exports = { createCalendar, updateCalendar, deleteCalendar };
