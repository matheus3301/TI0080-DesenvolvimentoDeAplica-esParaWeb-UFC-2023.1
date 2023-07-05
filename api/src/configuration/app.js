const express = require('express');
const cors = require('cors');

const questionRouter = require('../routes/questionRouter');
const teacherRouter = require('../routes/teacherRouter');
const studentRouter = require('../routes/studentRouter');
const classRouter = require('../routes/classRouter');
const authRouter = require('../routes/authRouter');
const principalRouter = require('../routes/principalRouter');
const examRouter = require('../routes/examRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questions', questionRouter);
app.use('/teachers', teacherRouter);
app.use('/students', studentRouter);
app.use('/classes', classRouter);
app.use('/principals', principalRouter);
app.use('/auth', authRouter);
app.use('/exams', examRouter);

module.exports = app;
