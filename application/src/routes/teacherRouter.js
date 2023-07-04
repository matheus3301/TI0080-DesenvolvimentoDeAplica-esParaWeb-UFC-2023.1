const router = require('express').Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.dashboardPage);

// teacherRouter.get('/', (req, res) => {
//   let content = {
//     name: 'Matheus',
//   };

//   res.render('teacher/base.njk', content);
// });

// teacherRouter.get('/classes', async (req, res) => {
//   let classes_data = await getAllClasses();
//   let content = {
//     name: 'Matheus',
//     classes: true,
//     classes_data: classes_data,
//   };

//   res.render('teacher/classes.njk', content);
// });

// teacherRouter.get('/tests', (req, res) => {
//   let content = {
//     name: 'Matheus',
//     tests: true,
//   };

//   res.render('teacher/tests.njk', content);
// });

// teacherRouter.get('/questions', async (req, res) => {
//   let query = req.query.query;
//   let questions_data = await getQuestions(query);
//   let content = {
//     name: 'Matheus',
//     questions: true,
//     questions_data: questions_data,
//   };

//   res.render('teacher/questions.njk', content);
// });

// teacherRouter.get('/questions/create', async (req, res) => {
//   let content = {
//     name: 'Matheus',
//     questions: true,
//   };

//   res.render('teacher/create_question.njk', content);
// });

module.exports = router;
