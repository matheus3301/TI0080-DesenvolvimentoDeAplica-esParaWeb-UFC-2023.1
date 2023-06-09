const authRouter = require('express').Router();

authRouter.get('/login', (req, res) => {
  let content = {
  };

  res.render('login.njk', content);
});

authRouter.get('/teacher/', (req, res) => {
  let content = {
    name: 'Matheus',
  };

  res.render('teacher/teacher_base.njk', content)
})

authRouter.get('/teacher/classes', (req, res) => {
  let content = {
    name: 'Matheus',
    classes: true,
  };

  res.render('teacher/teacher_classes.njk', content)
})

authRouter.get('/teacher/tests', (req, res) => {
  let content = {
    name: 'Matheus',
    tests: true,
  };

  res.render('teacher/teacher_tests.njk', content)
})

authRouter.get('/teacher/questions', (req, res) => {
  let content = {
    name: 'Matheus',
    questions: true,
  };

  res.render('teacher/teacher_questions.njk', content)
})

module.exports = authRouter;
