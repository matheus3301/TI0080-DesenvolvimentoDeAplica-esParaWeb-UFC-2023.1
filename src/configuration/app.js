const express = require('express');
const nunjucks = require('nunjucks');
const cors = require('cors');

const app = express();

app.use(cors());

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

module.exports = app;
