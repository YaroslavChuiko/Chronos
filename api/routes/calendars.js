const express = require('express');
const {
  createCalendar,
  updateCalendar,
  deleteCalendar,
  shareCalendar,
  confirmCalendar,
  getInvitedUsers,
  getCalendars,
  getCalendarById,
  getHolidays,
} = require('~/controllers/calendars');
const authenticate = require('~/middleware/auth');
const boundary = require('~/helpers/error-boundary');
const validate = require('~/helpers/validation');
const { createSchema, updateSchema, shareSchema } = require('~/validation/calendar');
const eventRouter = require('~/routes/event');

const router = express.Router();

router.use(authenticate);

router.get('/', boundary(getCalendars));
router.get('/holidays', boundary(getHolidays));
router.post('/', validate(createSchema), boundary(createCalendar));

router.get('/:id', boundary(getCalendarById));
router.put('/:id', validate(updateSchema), boundary(updateCalendar));
router.delete('/:id', boundary(deleteCalendar));

router.get('/:id/invited', boundary(getInvitedUsers));
router.post('/:id/invite', validate(shareSchema), boundary(shareCalendar));
router.post('/invite-confirm/:token', boundary(confirmCalendar));

router.use('/:id/events', eventRouter);

module.exports = router;
