const Joi = require('joi');

const eventSchema = Joi.object().keys({
  types: Joi.string().allow(''),
  startAt: Joi.date().iso(),
  endAt: Joi.date().iso(),
  calendars: Joi.string().allow(''),
});

module.exports = { eventSchema };
