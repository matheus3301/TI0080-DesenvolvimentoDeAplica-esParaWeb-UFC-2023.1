const router = require('express').Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.dashboardPage);
router.get('/classes', teacherController.classListPage);
router.get('/classes/:id', teacherController.classPage);
router.get('/classes/:id/delete', teacherController.handleDeleteClass);
router.get('/questions', teacherController.questionListPage);
router.get('/exams', teacherController.examListPage);
router.get('/exams/new', teacherController.createExamPage);
router.post('/exams/new', teacherController.handleCreateExamForm);
router.get('/questions/new', teacherController.createQuestionPage);
router.post('/questions/new', teacherController.handleCreateQuestionForm);
router.get('/questions/:id', teacherController.questionPage);
router.get('/questions/:id/delete', teacherController.handleDeleteQuestion);
router.get('/classes/:classId/game/:gameId', teacherController.gamePage);

module.exports = router;
