const express = require('express');
const { updateEvent, createEvent, deleteEvent } = require('~/controllers/events');
const boundary = require('~/helpers/error-boundary');
const validate = require('~/helpers/validation');
const { updateSchema, createSchema } = require('~/validation/event');

const router = express.Router({ mergeParams: true });

router.post('/', validate(createSchema), boundary(createEvent));

router.patch('/:eventId', validate(updateSchema), boundary(updateEvent));
router.delete('/:eventId', boundary(deleteEvent));

module.exports = router;
