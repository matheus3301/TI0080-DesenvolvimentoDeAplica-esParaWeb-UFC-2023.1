const { student } = require('../services/api');

const dashboardPage = async (req, res) => {
  let content = {
    error: req.query,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    dashboard: true,
  };

  res.render('student/student_dashboard.njk', content);
};

const myClassesPage = async (req, res) => {
  let { token } = req.cookies;

  let classes = await student.getMyEnrollments({ token });
  classes = classes.map((enrollment) => {
    return enrollment.class;
  });

  let content = {
    error: req.query,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    my_classes: true,
    classes_data: classes,
  };

  res.render('student/student_classes.njk', content);
};

const searchForClassesPage = async (req, res) => {
  let { token } = req.cookies;
  let { query } = req.query;

  let content = {
    error: req.query,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    search_classes: true,
    classes_data: classes,
  };
};

module.exports = {
  dashboardPage,
  myClassesPage,
  searchForClassesPage,
};
