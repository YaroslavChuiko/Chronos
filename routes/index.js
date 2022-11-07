const express = require('express');
const example = require('~/routes/prisma');
const auth = require('~/routes/auth');

const router = express.Router();

router.use('/auth', auth);
router.use('/prisma', example);

module.exports = router;
