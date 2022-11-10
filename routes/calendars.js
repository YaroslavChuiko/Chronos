const express = require('express');
const {
  createCalendar,
  updateCalendar,
  deleteCalendar,
  authorCheck,
  shareCalendar,
  confirmCalendar,
  getInvitedUsers,
  createCalendarEvent,
} = require('~/controllers/calendars');
const authenticate = require('~/middleware/auth');
const boundary = require('~/helpers/error-boundary');
const validate = require('~/helpers/validation');
const { createSchema, updateSchema, shareSchema, createEventSchema } = require('~/validation/calendar');

const router = express.Router();

router.use(authenticate);

router.get('/:id/invited', boundary(getInvitedUsers));

router.post('/', validate(createSchema), boundary(createCalendar));
router.post('/invite-confirm/:token', boundary(confirmCalendar));

router.use('/:id', authorCheck);

router.put('/:id', validate(updateSchema), boundary(updateCalendar));
router.delete('/:id', boundary(deleteCalendar));

router.post('/:id/events', validate(createEventSchema), boundary(createCalendarEvent));
// router.delete('/:calendarId/events/:eventId');

router.post('/:id/invite', validate(shareSchema), boundary(shareCalendar));

module.exports = router;
