const getDateFilter = (startAt, endAt) => {
  const filters = {};

  const date = (d) => new Date(d).toISOString();

  if (startAt) {
    filters.startAt = { gte: date(startAt) };
  }
  if (endAt) {
    filters.endAt = { lte: date(endAt) };
  }

  return filters;
};

module.exports = getDateFilter;
