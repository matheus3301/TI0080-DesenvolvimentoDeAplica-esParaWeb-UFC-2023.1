const express = require('express');
const nunjucks = require('nunjucks');
const cors = require('cors');

const authRouter = require('../routes/auth');

const app = express();

app.use(cors());

nunjucks.configure('src/views', {
  autoescape: true,
  express: app,
});

app.use('/', authRouter);

module.exports = app;
