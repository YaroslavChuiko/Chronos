const { ROLE_ENUM } = require('~/consts/validation');
const { calendar } = require('~/lib/prisma');

const createCalendar = async (req, res) => {
  const data = req.body;
  const { id } = req.user;

  const newCalendar = await calendar.create({
    data: {
      ...data,
      users: {
        create: [
          {
            userId: id,
            role: ROLE_ENUM.admin,
          },
        ],
      },
    },
  });

  res.json(newCalendar);
};

module.exports = { createCalendar };
