const principalRouter = require('express').Router();
const { get_all_questions, get_all_classes } = require('../../../services/api');

principalRouter.get('/dashboard', (req, res) => {
  let content = {
    name: 'Matheus',
    dashboard: true,
  };

  res.render('principal/principal_dashboard.njk', content)
})

principalRouter.get('/teachers', async (req, res) => {
  let content = {
    name: 'Matheus',
    teachers: true
  };

  res.render('principal/principal_teachers.njk', content)
})

principalRouter.get('/students', (req, res) => {
  let content = {
    name: 'Matheus',
    students: true,
  };

  res.render('principal/principal_students.njk', content)
})


module.exports = principalRouter;
