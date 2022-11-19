const getEventFilters = ({ types, calendars }) => ({
  calendars: {
    some: { calendar: { id: { in: calendars } } },
  },
  type: { in: types },
});

module.exports = { getEventFilters };
