const { PrismaClient } = require('@prisma/client');
const { DEFAULT_CALENDAR } = require('../../consts/default');
const { ROLES } = require('../../consts/validation');
const users = require('./users');
const events = require('./events');

const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    users.map((data) =>
      prisma.user.create({
        data: {
          ...data,
          calendars: {
            create: {
              role: ROLES.moderator,
              calendar: { create: DEFAULT_CALENDAR },
            },
          },
        },
      }),
    ),
  );

  await Promise.all(
    events.map(({ userId, calendarId, ...data }) =>
      prisma.event.create({
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
      }),
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
