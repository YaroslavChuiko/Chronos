require('module-alias/register');
require('./module-aliases');
require('dotenv').config();

const express = require('express');
const serverSetup = require('~/server/setup');
const logger = require('~/logger/logger');

const app = express();

serverSetup(app).catch((err) => logger.error(err));
