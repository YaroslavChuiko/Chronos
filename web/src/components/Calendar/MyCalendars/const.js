import { IS_MAIN } from '~/consts/calendar';

const initialCalendars = (calendars) =>
  calendars.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.id]: IS_MAIN(curr.name),
    }),
    {},
  );

const initialTypes = {
  arrangement: true,
  reminder: true,
  task: true,
};

export { initialCalendars, initialTypes };
