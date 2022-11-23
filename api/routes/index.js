const express = require('express');
const auth = require('~/routes/auth');
const calendars = require('~/routes/calendars');
const events = require('~/routes/events');

const router = express.Router();

router.use('/auth', auth);
router.use('/calendars', calendars);
router.use('/events', events);

module.exports = router;
