const express = require('express');
const { shareEvent, confirmEvent, getInvitedUsers, getCalendarEvents } = require('~/controllers/events');
const boundary = require('~/helpers/error-boundary');
const validate = require('~/helpers/validation');
const authenticate = require('~/middleware/auth');
const { shareSchema } = require('~/validation/calendar');
const { eventSchema } = require('~/validation/query');

const router = express.Router();

router.use(authenticate);

router.get('/', validate(eventSchema, 'query'), boundary(getCalendarEvents));
router.post('/:id/invite', validate(shareSchema), boundary(shareEvent)); //! shareSchema
router.post('/invite-confirm/:token', boundary(confirmEvent));
router.get('/:id/invited', boundary(getInvitedUsers));

module.exports = router;
