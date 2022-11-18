const getHolidayDate = (initial) => {
  const date = new Date(initial);
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().split('T')[0];
};

const toDate = (initial) => {
  return new Date(initial).toISOString().split('T')[0];
};

export { getHolidayDate, toDate };
