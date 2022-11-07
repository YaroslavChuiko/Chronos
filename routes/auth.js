const express = require('express');
const { register, login, refresh, logout } = require('~/controllers/auth');
const validate = require('~/middleware/validation');
const { registerSchema, loginSchema } = require('~/validation/user');

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;
