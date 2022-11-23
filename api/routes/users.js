const express = require('express');
const boundary = require('~/helpers/error-boundary');
const { getUsers } = require('~/controllers/users');
const authenticate = require('~/middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', boundary(getUsers));

module.exports = router;
