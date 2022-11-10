const express = require('express');
const { createCalendarEvent, deleteCalendarEvent } = require('~/controllers/calendars');
const boundary = require('~/helpers/error-boundary');
const validate = require('~/helpers/validation');
const { createEventSchema } = require('~/validation/calendar');

const router = express.Router({ mergeParams: true });

router.post('/', validate(createEventSchema), boundary(createCalendarEvent));

router.delete('/:eventId', boundary(deleteCalendarEvent));

module.exports = router;
