const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errorMiddleware } = require('~/middleware');

const serverInit = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: 'GET, POST, PUT, PATCH, DELETE',
      allowedHeaders: 'Content-Type, Authorization, Set-Cookie',
    }),
  );
  // app.use('/', router);

  app.use(errorMiddleware);
};

module.exports = serverInit;
