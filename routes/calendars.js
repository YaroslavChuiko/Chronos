const express = require('express');
const { createCalendar } = require('~/controllers/calendars');
const authenticate = require('~/middleware/auth');
const boundary = require('~/helpers/error-boundary');
const validate = require('~/helpers/validation');
const { createSchema } = require('~/validation/calendar');

const router = express.Router();

router.post('/', authenticate, validate(createSchema), boundary(createCalendar));
// router.put('/:id', )
// router.delete('/:id', )
// router.post('/:id/events/:id', )

module.exports = router;
