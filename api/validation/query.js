const Joi = require('joi');

const eventSchema = Joi.object().keys({
  types: Joi.string().allow(''),
  start: Joi.date().iso(),
  end: Joi.date().iso(),
  calendars: Joi.string().allow(''),
});

module.exports = { eventSchema };
