const { principal } = require('../services/api');

const dashboardPage = async (req, res) => {
  let content = {
    error: req.query,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
  };

  res.render('principal/principal_dashboard.njk', content);
};

const teacherListPage = async (req, res) => {
  let teachers_data = await principal.getTeachers({ token: req.cookies.token });
  teachers_data.forEach((teacher) => {
    teacher.classes = teacher.classes.length;
  });

  let content = {
    error: req.query,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    teachers: true,
    teachers_data,
  };

  res.render('principal/principal_teachers.njk', content);
};

module.exports = {
  dashboardPage,
  teacherListPage,
};
