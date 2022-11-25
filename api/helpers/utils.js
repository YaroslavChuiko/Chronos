const reduceToRole = (array) => {
  const result = array.reduce(
    (prev, { users, ...curr }) => [
      ...prev,
      {
        ...curr,
        role: users[0].role,
      },
    ],
    [],
  );

  return result;
};

const reduceToConfirmed = (array, name) => {
  const result = array.reduce(
    (prev, { password, ...curr }) => [
      ...prev,
      {
        ...curr,
        isConfirmed: curr[name][0].isConfirmed,
      },
    ],
    [],
  );

  result.map((v) => delete v[name]);
  return result;
};

module.exports = { reduceToRole, reduceToConfirmed };
