const { teacher } = require('../services/api');

const dashboardPage = async (req, res) => {
  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    dashboard: true,
  };

  res.render('teacher/teacher_dashboard.njk', content);
};

const classListPage = async (req, res) => {
  let { token } = req.cookies;

  let classes_data = await teacher.getMyClasses({ token });

  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    classes: true,
    classes_data: classes_data,
  };

  res.render('teacher/teacher_classes.njk', content);
};

module.exports = {
  dashboardPage,
  classListPage,
};
