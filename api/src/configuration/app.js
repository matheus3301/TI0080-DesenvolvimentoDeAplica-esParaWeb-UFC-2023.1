const express = require('express');
const cors = require('cors');

const questionRouter = require('../routes/questionRouter');
const teacherRouter = require('../routes/teacherRouter');
const studentRouter = require('../routes/studentRouter');
const classRouter = require('../routes/classRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questions', questionRouter);
app.use('/teachers', teacherRouter);
app.use('/students', studentRouter);
app.use('/classes', classRouter);

module.exports = app;
