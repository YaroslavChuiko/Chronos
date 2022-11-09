const express = require('express');
const { register, login, refresh, logout } = require('~/controllers/auth');
const validate = require('~/helpers/validation');
const { registerSchema, loginSchema } = require('~/validation/user');
const boundary = require('~/helpers/error-boundary');

const router = express.Router();

router.post('/register', validate(registerSchema), boundary(register));
router.post('/login', validate(loginSchema), boundary(login));
router.post('/refresh', boundary(refresh));
router.post('/logout', boundary(logout));

module.exports = router;
