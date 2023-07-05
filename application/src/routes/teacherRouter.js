const router = require('express').Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.dashboardPage);
router.get('/classes', teacherController.classListPage);
router.get('/classes/new', teacherController.createClassPage);
router.post('/classes/new', teacherController.handleCreateClassForm);
router.get('/classes/:id', teacherController.classPage);
router.get('/classes/:id/delete', teacherController.handleDeleteClass);
router.get('/questions', teacherController.questionListPage);
router.get('/exams', teacherController.examListPage);
router.get('/exams/new', teacherController.createExamPage);
router.get('/exams/:id', teacherController.examPage);
router.post('/exams/new', teacherController.handleCreateExamForm);
router.get('/exams/:id/delete', teacherController.handleDeleteExam);
router.get('/questions/new', teacherController.createQuestionPage);
router.post('/questions/new', teacherController.handleCreateQuestionForm);
router.get('/questions/:id', teacherController.questionPage);
router.get('/questions/:id/delete', teacherController.handleDeleteQuestion);
router.get('/classes/:classId/game/new', teacherController.createGamePage);
router.post('/classes/:classId/game/new', teacherController.handleCreateGame);
router.get('/classes/:classId/game/:gameId', teacherController.gamePage);

module.exports = router;
