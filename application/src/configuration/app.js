const express = require('express');
const nunjucks = require('nunjucks');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();

const authRouter = require('../routes/authRouter');
const teacherRouter = require('../routes/teacherRouter');
const principalRouter = require('../routes/principalRouter');
const indexRouter = require('../routes/indexRouter');

const app = express();

app.use(cors());
app.use(express.static('static'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(upload.array());
app.use(cookieParser());

nunjucks.configure('templates', {
  autoescape: true,
  express: app,
});

app.use('/', indexRouter);
app.use('/login', authRouter);
app.use('/teacher', teacherRouter);
app.use('/principal', principalRouter);

module.exports = app;
