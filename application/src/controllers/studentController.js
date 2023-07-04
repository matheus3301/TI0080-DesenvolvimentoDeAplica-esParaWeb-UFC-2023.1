const { student } = require('../services/api');

const dashboardPage = async (req, res) => {
  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    dashboard: true,
  };

  res.render('student/student_dashboard.njk', content);
};

const viewClassPage = async (req, res) => {
  let { token } = req.cookies;
  let { id } = req.params;

  let clasz = await student.getClass(id, token);

  if (clasz.enrollments.some((e) => e.studentId == req.userId)) {
    let content = {
      error: req.query.error,
      message: req.query.message,
      name: req.userName,
      profilePictureUrl: req.userProfilePictureUrl,
      my_classes: true,
      class_data: clasz,
    };

    res.render('student/student_class_view.njk', content);
  } else {
    res.redirect(
      `/student/classes?error=${encodeURIComponent(
        'Estudante não matriculado na turma ' + id + '!'
      )}`
    );
  }
};

const myClassesPage = async (req, res) => {
  let { token } = req.cookies;

  let classes = await student.getMyEnrollments({ token });
  classes = classes.map((enrollment) => {
    return enrollment.class;
  });

  let content = {
    error: req.query.error,
    message: req.query.message,
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

  let classes = await student.searchForClasses(query, token);
  classes = classes.map((clasz) => {
    if (
      clasz.enrollments.some((enrollment) => enrollment.studentId == req.userId)
    ) {
      clasz.canEnroll = false;
    } else {
      clasz.canEnroll = true;
    }
    return clasz;
  });

  let content = {
    query: query,
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    search_classes: true,
    classes_data: classes,
  };

  res.render('student/student_search.njk', content);
};

//TODO: Vitor - Fazer endpoint para se matricular em uma turma
module.exports = {
  dashboardPage,
  myClassesPage,
  searchForClassesPage,
  viewClassPage,
};
