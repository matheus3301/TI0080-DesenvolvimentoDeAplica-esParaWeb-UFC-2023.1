const express = require('express');
const nunjucks = require('nunjucks');
const cors = require('cors');

const authRouter = require('../routes/auth');
const teacherRouter = require('../routes/teacher');

const app = express();

app.use(cors());
app.use(express.static('static'));

nunjucks.configure('templates', {
  autoescape: true,
  express: app,
});

app.use('/', authRouter);
app.use('/teacher', teacherRouter);

module.exports = app;
