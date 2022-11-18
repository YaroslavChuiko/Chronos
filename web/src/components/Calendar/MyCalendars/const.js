const initialCalendars = (calendars) =>
  calendars.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.id]: curr.name === 'Main Calendar',
    }),
    {},
  );

const initialTypes = {
  arrangement: true,
  reminder: true,
  task: true,
};

export { initialCalendars, initialTypes };
