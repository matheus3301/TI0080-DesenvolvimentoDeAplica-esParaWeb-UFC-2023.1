const principalRouter = require('express').Router();
const { getAllStudents, getStudentById } = require('../../../services/api');

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
  students.forEach((student) => {
    student.enrollments = student.enrollments.length;
  });

  const content = {
    name: 'Matheus',
    students: students,
  };

  res.render('principal/principal_students.njk', content);
});

principalRouter.get('/students/new', async (req, res) => {
  const content = {
    name: 'Matheus',
  };

  res.render('principal/principal_student_view.njk', content);
});

principalRouter.get('/students/:id', async (req, res) => {
  const { id } = req.params;

  const content = {
    name: 'Matheus',
    student: await getStudentById(id),
  };

  console.log(await getStudentById(id));

  res.render('principal/principal_student_view.njk', content);
});

module.exports = principalRouter;
