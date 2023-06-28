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
        case 'STUDENT':
          return res.redirect('/student');
        case 'PRINCIPAL':
          return res.redirect('/principal');
        default:
          return res.redirect('/login');
      }
    } catch (err) {
      return res.redirect(
        `/login?error=${encodeURIComponent(
          'Sessão expirada, faça login novamente!'
        )}`
      );
    }
  }
});

router.get('/logout', async (req, res) => {
  return res.clearCookie('token').redirect('/');
});

module.exports = router;
