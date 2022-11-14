const toDate = require('./to-date');

const getEventFilters = ({ startAt, endAt, type }) => {
  const filters = {};

  if (startAt) {
    filters.startAt = { gte: toDate(startAt) };
  }
  if (endAt) {
    filters.endAt = { lte: toDate(endAt) };
  }
  if (type) {
    filters.type = type;
  }

  return filters;
};

module.exports = { getEventFilters };
