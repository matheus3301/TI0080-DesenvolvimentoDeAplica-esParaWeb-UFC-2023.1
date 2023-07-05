const router = require('express').Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.dashboardPage);
router.get('/classes', teacherController.classListPage);
router.get('/questions', teacherController.questionListPage);
router.get('/questions/new', teacherController.createQuestionPage);
router.post('/questions/new', teacherController.handleCreateQuestionForm);
router.get('/questions/:id', teacherController.questionPage)
router.get('/questions/:id/delete', teacherController.handleDeleteQuestion);

//TODO: Vitão - escrever todos os métodos no controller e no service api para realizar todas as funcionalidades do professor, incluindo criar provas, ver turma (OBS, deixar a parte de aplicar prova pro final)

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
