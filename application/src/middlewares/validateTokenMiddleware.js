const { auth, principal } = require('../services/api');

const validateTokenMiddleware = async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    return res.redirect(
      `/login?error=${encodeURIComponent(
        'Faça login para ter acesso ao sistema!'
      )}`
    );
  } else {
    try {
      let userData = await auth.validate({ token });
      req.userType = userData.userType;
      req.userId = userData.userId;

      next();
    } catch (err) {
      return res.redirect(
        `/login?error=${encodeURIComponent(
          'Sessão expirada, faça login novamente!'
        )}`
      );
    }
  }
};

module.exports = validateTokenMiddleware;
