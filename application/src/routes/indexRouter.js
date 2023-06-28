const router = require('express').Router();
const api = require('../services/api');

router.get('/', async (req, res) => {
  let token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  } else {
    try {
      let userData = await api.auth.validate({ token });

      switch (userData.userType) {
        case 'TEACHER':
          return res.redirect('/teacher');
          break;
        case 'STUDENT':
          return res.redirect('/student');
          break;
        case 'PRINCIPAL':
          return res.redirect('/principal');
          break;
        default:
          return res.redirect('/login');
      }
    } catch (err) {
      return res.redirect('/login');
    }
  }
});

module.exports = router;
