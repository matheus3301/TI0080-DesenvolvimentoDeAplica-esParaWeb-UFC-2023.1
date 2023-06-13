const express = require('express');
const nunjucks = require('nunjucks');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const authRouter = require('../routes/auth');
const teacherRouter = require('../routes/teacher');
const principalRouter = require('../routes/principal');

const app = express();

app.use(cors());
app.use(express.static('static'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(upload.array());

nunjucks.configure('templates', {
  autoescape: true,
  express: app,
});

app.use('/', authRouter);
app.use('/teacher', teacherRouter);
app.use('/principal', principalRouter);

module.exports = app;
