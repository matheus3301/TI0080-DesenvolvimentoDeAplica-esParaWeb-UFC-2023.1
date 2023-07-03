const { principal, teacher, student } = require('../services/api');

const loadUserDataMiddleware = async (req, res, next) => {
  let token = req.cookies.token;

  switch (req.userType) {
    case 'TEACHER':
      let teacherData = await teacher.getPersonalInformation({
        token,
      });

      req.userName = teacherData.name;
      req.userProfilePictureUrl = studentData.profilePictureUrl;
      break;
    case 'STUDENT':
      let studentData = await student.getPersonalInformation({
        token,
      });

      req.userName = studentData.name;
      req.userProfilePictureUrl = studentData.profilePictureUrl;
      break;
    case 'PRINCIPAL':
      let principalData = await principal.getPersonalInformation({
        token,
      });

      req.userName = principalData.name;
      req.userProfilePictureUrl = principalData.profilePictureUrl;

      break;
    default:
      return res.redirect('/login');
  }

  next();
};

module.exports = loadUserDataMiddleware;
