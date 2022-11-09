const express = require('express');
const example = require('~/routes/prisma');
const auth = require('~/routes/auth');
const calendars = require('~/routes/calendars');

const router = express.Router();

router.use('/auth', auth);
router.use('/calendars', calendars);
router.use('/prisma', example);

module.exports = router;
