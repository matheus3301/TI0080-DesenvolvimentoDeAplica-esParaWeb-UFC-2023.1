const router = require('express').Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
  let content = {};

  res.render('login.njk', content);
});

router.post('/', (req, res) => {
  let { email, password } = req.body;

  console.log(`[] user with email ${email} trying to login`);
});

module.exports = router;
