const authRouter = require('express').Router();

authRouter.get('/login', (req, res) => {
  let content = {
    title: 'Login | SmartTrivia',
  };

  res.render('login.njk', content);
});

module.exports = authRouter;
