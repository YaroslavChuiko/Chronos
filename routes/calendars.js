const express = require('express');
const { createCalendar, updateCalendar, deleteCalendar } = require('~/controllers/calendars');
const authenticate = require('~/middleware/auth');
const boundary = require('~/helpers/error-boundary');
const validate = require('~/helpers/validation');
const { createSchema, updateSchema } = require('~/validation/calendar');

const router = express.Router();

router.use(authenticate);

router.post('/', validate(createSchema), boundary(createCalendar));
router.put('/:id', validate(updateSchema), boundary(updateCalendar));
router.delete('/:id', boundary(deleteCalendar));

// router.post('/:calendarId/events/:eventId');
// router.delete('/:calendarId/events/:eventId');

module.exports = router;
