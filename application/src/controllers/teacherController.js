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
}

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
}

const createQuestionPage = async (req, res) => {
  let content = {
    error: req.query.error,
    message: req.query.message,
    name: req.userName,
    profilePictureUrl: req.userProfilePictureUrl,
    questions: true
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
  }

  for (var i = 0; i < Object.keys(body).length - 2; i++){
    let alternative = i + 1;
    let alternative_method = `alternative_${alternative}`
    if (alternative == 1) {
      sanitized_body.choices.push({
        value: body[alternative_method],
        isCorrect: true
      })
    } else {
      sanitized_body.choices.push({
        value: body[alternative_method]
      })   
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

module.exports = {
  dashboardPage,
  classListPage,
  questionListPage,
  createQuestionPage,
  handleCreateQuestionForm,
  questionPage,
  handleDeleteQuestion
};
