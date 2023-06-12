const fetch = require("node-fetch");
const authRouter = require('express').Router();

authRouter.get('/login', (req, res) => {
  let content = {
  };

  res.render('login.njk', content);
});

module.exports = authRouter;