const express = require('express');
const { updateEvent, createEvent, deleteEvent, getCalendarEvents } = require('~/controllers/events');
const boundary = require('~/helpers/error-boundary');
const validate = require('~/helpers/validation');
const { updateSchema, createSchema } = require('~/validation/event');

const router = express.Router({ mergeParams: true });

router.post('/', validate(createSchema), boundary(createEvent));
router.get('/', boundary(getCalendarEvents));

router.patch('/:eventId', validate(updateSchema), boundary(updateEvent));
router.delete('/:eventId', boundary(deleteEvent));

module.exports = router;
