const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

// app.use('/', authRouter);

module.exports = app;
