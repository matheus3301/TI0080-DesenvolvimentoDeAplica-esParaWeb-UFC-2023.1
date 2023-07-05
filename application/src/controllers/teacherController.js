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

const questionListPage = async (req, res) => {
  let { token } = req.cookies;
  let { query } = req.query;
  let questions_data = await teacher.getQuestions({ query, token });

  let content = {
    query: query,
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    questions: true,
    questions_data: questions_data,
  };

  res.render('teacher/teacher_questions.njk', content);
};

const questionPage = async (req, res) => {
  let { token } = req.cookies;
  let { id } = req.params;
  let question_data = await teacher.getQuestionByID({ id, token });

  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    questions: true,
    question: question_data,
  };

  res.render('teacher/teacher_question.njk', content);
};

const createQuestionPage = async (req, res) => {
  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    questions: true,
  };

  res.render('teacher/teacher_create_question.njk', content);
};

const handleCreateQuestionForm = async (req, res) => {
  let { body } = req;
  let { token } = req.cookies;

  let sanitized_body = {
    title: body.title,
    statement: body.statement,
    choices: [],
  };

  for (var i = 0; i < Object.keys(body).length - 2; i++) {
    let alternative = i + 1;
    let alternative_method = `alternative_${alternative}`;
    if (alternative == 1) {
      sanitized_body.choices.push({
        value: body[alternative_method],
        isCorrect: true,
      });
    } else {
      sanitized_body.choices.push({
        value: body[alternative_method],
      });
    }
  }

  try {
    const response = await teacher.createQuestion(sanitized_body, token);
    res.redirect(
      `/teacher/questions?message=${encodeURIComponent(
        'Questão criada com sucesso!'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/teacher/questions?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const handleDeleteQuestion = async (req, res) => {
  const { id } = req.params;
  let { token } = req.cookies;

  try {
    await teacher.deleteQuestion(id, token);

    res.redirect(
      `/teacher/questions?message=${encodeURIComponent(
        'Questão deletada com sucesso!'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/teacher/questions?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const examListPage = async (req, res) => {
  let { token } = req.cookies;
  let { query } = req.query;
  let exams_data = await teacher.getExams({ query, token });

  let content = {
    query: query,
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    exams: true,
    exams_data: exams_data,
  };

  res.render('teacher/teacher_exams.njk', content);
};

const createExamPage = async (req, res) => {
  let { token } = req.cookies;

  let questions_data = await teacher.getQuestions({ token });

  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    exams: true,
    questions_data: questions_data,
  };

  res.render('teacher/teacher_exam_view.njk', content);
};

const handleCreateExamForm = async (req, res) => {
  let { body } = req;
  let { token } = req.cookies;

  let sanitized_body = {
    title: body.title,
    questions: [],
  };

  for (var i = 0; i < Object.keys(body).length - 1; i++) {
    let question = i + 1;
    let question_method = `question_${question}`;
    sanitized_body.questions.push(parseInt(body[question_method]));
  }

  try {
    const response = await teacher.createExam(sanitized_body, token);
    res.redirect(
      `/teacher/exams?message=${encodeURIComponent(
        'Prova criada com sucesso!'
      )}`
    );
  } catch (err) {
    console.log(err);
    res.redirect(
      `/teacher/exams?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const classPage = async (req, res) => {
  let { token } = req.cookies;
  let { id } = req.params;
  let class_data = await teacher.getClassByID({ id, token });

  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    classes: true,
    class_data: class_data,
  };

  res.render('teacher/teacher_class_view.njk', content);
};

const handleDeleteClass = async (req, res) => {
  const { id } = req.params;
  let { token } = req.cookies;

  try {
    await teacher.deleteClass(id, token);

    res.redirect(
      `/teacher/classes?message=${encodeURIComponent(
        'Turma deletada com sucesso!'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/teacher/classes?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const examPage = async (req, res) => {
  let { token } = req.cookies;
  let { id } = req.params;

  let exams_data = await teacher.getExamByID({ id, token });

  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    exams: true,
    exams_data: exams_data,
  };

  res.render('teacher/teacher_exam_view.njk', content);
};

const handleDeleteExam = async (req, res) => {
  const { id } = req.params;
  let { token } = req.cookies;

  try {
    await teacher.deleteExam(id, token);

    res.redirect(
      `/teacher/exams?message=${encodeURIComponent(
        'Prova deletada com sucesso!'
      )}`
    );
  } catch (err) {
    res.redirect(
      `/teacher/exams?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

const createClassPage = async (req, res) => {
  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    classes: true,
  };

  res.render('teacher/teacher_create_class.njk', content);
};

const handleCreateClassForm = async (req, res) => {
  let { body } = req;
  let { token } = req.cookies;

  try {
    const response = await teacher.createClass(body, token);
    res.redirect(
      `/teacher/classes?message=${encodeURIComponent(
        'Turma criada com sucesso!'
      )}`
    );
  } catch (err) {
    console.log(err);
    res.redirect(
      `/teacher/classes?error=${encodeURIComponent(err.response.data.error)}`
    );
  }
};

module.exports = {
  dashboardPage,
  classListPage,
  questionListPage,
  createQuestionPage,
  handleCreateQuestionForm,
  questionPage,
  handleDeleteQuestion,
  examListPage,
  createExamPage,
  handleCreateExamForm,
  classPage,
  handleDeleteClass,
  examPage,
  handleDeleteExam,
  createClassPage,
  handleCreateClassForm
};
