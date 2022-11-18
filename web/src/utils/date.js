const getDate = (initial) => {
  const date = new Date(initial);
  date.setFullYear(date.getFullYear() + 1);
  return date.toISOString().split('T')[0];
};

export { getDate };
