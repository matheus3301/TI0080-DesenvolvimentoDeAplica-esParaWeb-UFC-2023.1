const principalRouter = require('express').Router();
const { getAllStudents } = require('../../../services/api');

principalRouter.get('/', (req, res) => {
  let content = {
    name: 'Matheus',
    dashboard: true,
  };

  res.render('principal/principal_dashboard.njk', content);
});

principalRouter.get('/teachers', async (req, res) => {
  let content = {
    name: 'Matheus',
    teachers: true,
  };

  res.render('principal/principal_teachers.njk', content);
});

principalRouter.get('/students', async (req, res) => {
  let students = await getAllStudents();
  students = students.map((student) => {
    return {
      id: student.id,
      name: student.name,
      enrollments: student.enrollments.length,
    };
  });

  let content = {
    name: 'Matheus',
    students: students,
  };

  res.render('principal/principal_students.njk', content);
});

module.exports = principalRouter;
