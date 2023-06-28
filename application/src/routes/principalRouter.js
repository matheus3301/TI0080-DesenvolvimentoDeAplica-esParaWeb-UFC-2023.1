const router = require('express').Router();
const principalController = require('../controllers/principalController');

router.get('/', principalController.dashboardPage);
router.get('/teachers', principalController.teacherListPage);

// router.get('/teachers/new', async (req, res) => {
//   const content = {
//     name: 'Matheus',
//     teachers: true,
//   };

//   res.render('principal/principal_teacher_view.njk', content);
// });

// router.get('/teachers/:id', async (req, res) => {
//   const { id } = req.params;

//   const content = {
//     name: 'Matheus',
//     teachers: true,
//     teacher: await getTeacherById(id),
//   };

//   res.render('principal/principal_teacher_view.njk', content);
// });

// router.get('/students', async (req, res) => {
//   let students_data = await getAllStudents();
//   students_data.forEach((student) => {
//     student.enrollments = student.enrollments.length;
//   });

//   const content = {
//     name: 'Matheus',
//     students: true,
//     students_data: students_data,
//   };

//   res.render('principal/principal_students.njk', content);
// });

// router.get('/students/new', async (req, res) => {
//   const content = {
//     name: 'Matheus',
//     students: true,
//   };

//   res.render('principal/principal_student_view.njk', content);
// });

// router.get('/students/:id', async (req, res) => {
//   const { id } = req.params;

//   const content = {
//     name: 'Matheus',
//     students: true,
//     student: await getStudentById(id),
//   };

//   res.render('principal/principal_student_view.njk', content);
// });

module.exports = router;
