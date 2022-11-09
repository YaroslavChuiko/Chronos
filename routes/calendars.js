const express = require('express');
const { createCalendar } = require('~/controllers/calendars');
const { errorBoundary } = require('~/middleware');
const authenticate = require('~/middleware/auth');
const validate = require('~/middleware/validation');
const { createSchema } = require('~/validation/calendar');

const router = express.Router();

router.post('/', authenticate, validate(createSchema), errorBoundary(createCalendar));
// router.put('/:id', )
// router.delete('/:id', )
// router.post('/:id/events/:id', )

module.exports = router;
