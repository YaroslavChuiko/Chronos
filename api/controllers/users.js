const { user } = require('~/lib/prisma');
const { Factory } = require('~/services');

const getUsers = async (req, res) => {
  const { id } = req.user;

  const users = await Factory.findMany(
    user,
    {
      id: { not: id },
    },
    { id: true, email: true },
  );

  res.json(users);
};

module.exports = { getUsers };
