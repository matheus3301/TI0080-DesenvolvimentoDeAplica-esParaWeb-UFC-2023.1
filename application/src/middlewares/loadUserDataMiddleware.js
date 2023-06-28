const { principal } = require('../services/api');

const loadUserDataMiddleware = async (req, res, next) => {
  let token = req.cookies.token;

  switch (req.userType) {
    case 'TEACHER':
      // return res.redirect('/teacher');
      break;
    case 'STUDENT':
      // return res.redirect('/student');
      break;
    case 'PRINCIPAL':
      const { name, profilePictureUrl } =
        await principal.getPersonalInformation({
          token,
        });

      req.userName = name;
      req.userProfilePictureUrl = profilePictureUrl;

      break;
    default:
      return res.redirect('/login');
  }

  next();
};

module.exports = loadUserDataMiddleware;
