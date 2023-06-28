const principalRouter = require('express').Router();
const {
  getAllStudents,
  getStudentById,
  getAllTeachers,
  getTeacherById,
} = require('../services/api');

principalRouter.get('/', (req, res) => {
  let content = {
    name: 'Matheus',
    dashboard: true,
  };

  res.render('principal/principal_dashboard.njk', content);
});

principalRouter.get('/teachers', async (req, res) => {
  let teachers_data = await getAllTeachers();
  teachers_data.forEach((teacher) => {
    teacher.classes = teacher.classes.length;
  });
  let content = {
    name: 'Matheus',
    teachers: true,
    teachers_data: teachers_data,
  };

  res.render('principal/principal_teachers.njk', content);
});

principalRouter.get('/teachers/new', async (req, res) => {
  const content = {
    name: 'Matheus',
    teachers: true,
  };

  res.render('principal/principal_teacher_view.njk', content);
});

principalRouter.get('/teachers/:id', async (req, res) => {
  const { id } = req.params;

  const content = {
    name: 'Matheus',
    teachers: true,
    teacher: await getTeacherById(id),
  };

  res.render('principal/principal_teacher_view.njk', content);
});

principalRouter.get('/students', async (req, res) => {
  let students_data = await getAllStudents();
  students_data.forEach((student) => {
    student.enrollments = student.enrollments.length;
  });

  const content = {
    name: 'Matheus',
    students: true,
    students_data: students_data,
  };

  res.render('principal/principal_students.njk', content);
});

principalRouter.get('/students/new', async (req, res) => {
  const content = {
    name: 'Matheus',
    students: true,
  };

  res.render('principal/principal_student_view.njk', content);
});

principalRouter.get('/students/:id', async (req, res) => {
  const { id } = req.params;

  const content = {
    name: 'Matheus',
    students: true,
    student: await getStudentById(id),
  };

  res.render('principal/principal_student_view.njk', content);
});

module.exports = principalRouter;
