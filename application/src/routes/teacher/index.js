const fetch = require("node-fetch");
const teacherRouter = require('express').Router();

teacherRouter.get('/dashboard', (req, res) => {
  let content = {
    name: 'Matheus',
  };

  res.render('teacher/teacher_base.njk', content)
})

teacherRouter.get('/dashboard/classes', (req, res) => {
  let content = {
    name: 'Matheus',
    classes: true,
  };

  res.render('teacher/teacher_classes.njk', content)
})

teacherRouter.get('/dashboard/tests', (req, res) => {
  let content = {
    name: 'Matheus',
    tests: true,
  };

  res.render('teacher/teacher_tests.njk', content)
})

teacherRouter.get('/dashboard/questions', async (req, res) => {
  questions_data = []

  questions_data = await fetch('http://localhost:7777/questions')
  questions_data = await questions_data.json()

  let content = {
    name: 'Matheus',
    questions: true,
    questions_data: questions_data,
  };

  res.render('teacher/teacher_questions.njk', content)
})

module.exports = teacherRouter;
