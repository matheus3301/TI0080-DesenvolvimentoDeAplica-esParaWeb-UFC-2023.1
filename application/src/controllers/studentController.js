const { student } = require('../services/api');
const { getGamesByClassId } = require('../services/game');

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
    let games = getGamesByClassId(parseInt(id));
    let content = {
      error: req.query.error,
      message: req.query.message,
      name: req.userName,
      profilePictureUrl: req.userProfilePictureUrl,
      my_classes: true,
      class_data: clasz,
      games_data: games,
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

const handleClassEnrollment = async (req, res) => {
  let { token } = req.cookies;
  let { id } = req.params;

  try {
    await student.enrollOnClass(id, token);
    res.redirect(
      `/student/classes/${id}?message=${encodeURIComponent(
        'Sucesso ao ingressar na turma! Seja bem-vindo!'
      )}`
    );
  } catch (err) {
    console.log(err);

    res.redirect(
      `/student/classes?error=${encodeURIComponent(
        'Erro ao ingressar na turma!'
      )}`
    );
  }
};

const handleClassExit = async (req, res) => {
  let { token } = req.cookies;
  let { id } = req.params;

  try {
    await student.exitClass(id, token);
    res.redirect(
      `/student/classes?message=${encodeURIComponent(
        'Sucesso ao sair da turma'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/student/classes?error=${encodeURIComponent('Erro ao sair da turma!')}`
    );
  }
};

const gamePage = async (req, res) => {
  let { token } = req.cookies;
  let { classId, gameId } = req.params;

  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    game_data: {
      id: gameId,
    },
    userId: req.userId,
  };

  res.render('student/student_game.njk', content);
};

module.exports = {
  dashboardPage,
  myClassesPage,
  searchForClassesPage,
  viewClassPage,
  handleClassEnrollment,
  handleClassExit,
  gamePage,
};
