const teacherRouter = require('express').Router();
const { get_all_questions, get_all_classes } = require('../../../services/api');

teacherRouter.get('/dashboard', (req, res) => {
  let content = {
    name: 'Matheus',
  };

  res.render('teacher/teacher_base.njk', content)
})

teacherRouter.get('/dashboard/classes', async (req, res) => {
  let classes_data = await get_all_classes();
  let content = {
    name: 'Matheus',
    classes: true,
    classes_data: classes_data,
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
  let questions_data = await get_all_questions();

  let content = {
    name: 'Matheus',
    questions: true,
    questions_data: questions_data,
  };

  res.render('teacher/teacher_questions.njk', content)
})

module.exports = teacherRouter;
