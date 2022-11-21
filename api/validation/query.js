const Joi = require('joi');

const eventSchema = Joi.object().keys({
  types: Joi.string().allow(''),
  start: Joi.date().iso(),
  end: Joi.date().iso(),
  calendars: Joi.string().allow(''),
});

const calendarSchema = Joi.object().keys({
  roles: Joi.string().allow(''),
});

module.exports = { eventSchema, calendarSchema };
