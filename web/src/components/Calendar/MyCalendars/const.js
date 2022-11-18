const initialValues = (calendars) => {
  const initial = {};
  calendars.forEach((c) => {
    initial[c.id] = c.name === 'Main Calendar';
  });
  return initial;
};

export default initialValues;
