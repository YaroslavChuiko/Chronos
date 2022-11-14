const toDate = require('./to-date');

const getDateFilter = (startAt, endAt) => {
  const filters = {};

  if (startAt) {
    filters.startAt = { gte: toDate(startAt) };
  }
  if (endAt) {
    filters.endAt = { lte: toDate(endAt) };
  }

  return filters;
};

module.exports = getDateFilter;
