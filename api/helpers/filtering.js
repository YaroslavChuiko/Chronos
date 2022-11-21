const getEventFilters = ({ types, calendars }) => ({
  calendars: {
    some: { calendar: { id: { in: calendars } } },
  },
  type: { in: types },
});

const getCalendarFilters = ({ roles }) => ({
  role: { in: roles },
});

const splitParams = (str, mapTo) => (str && str.split(',').map(mapTo)) || [];

module.exports = { getEventFilters, getCalendarFilters, splitParams };
