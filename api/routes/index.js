const express = require('express');
const auth = require('~/routes/auth');
const calendars = require('~/routes/calendars');
const events = require('~/routes/events');
const users = require('~/routes/users');

const router = express.Router();

router.use('/auth', auth);
router.use('/calendars', calendars);
router.use('/events', events);
router.use('/users', users);

module.exports = router;
