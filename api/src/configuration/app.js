const express = require('express');
const cors = require('cors');

const questionRouter = require('../routes/questionRouter');
const teacherRouter = require('../routes/teacherRouter');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questions', questionRouter);
app.use('/teachers', teacherRouter);

module.exports = app;
