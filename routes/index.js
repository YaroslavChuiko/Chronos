const express = require('express');
const example = require('~/routes/prisma');
const auth = require('~/routes/auth');
const calendars = require('~/routes/calendars');
const events = require('~/routes/events');

const router = express.Router();

router.use('/auth', auth);
router.use('/calendars', calendars);
router.use('/events', events);
router.use('/prisma', example);

module.exports = router;
