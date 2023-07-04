const router = require('express').Router();
const principalController = require('../controllers/principalController');

router.get('/', principalController.dashboardPage);

router.get('/teachers', principalController.teacherListPage);
router.get('/teachers/new', principalController.createTeacherPage);
router.get('/teachers/:id', principalController.viewTeacherPage);
router.post('/teachers/new', principalController.handleCreateTeacherForm);
router.post('/teachers/:id', principalController.handleUpdateTeacherForm);
router.get('/teachers/:id/delete', principalController.handleDeleteTeacher);

router.get('/students', principalController.studentListPage);
router.get('/students/new', principalController.createStudentPage);
router.get('/students/:id', principalController.viewStudentPage);
router.post('/students/new', principalController.handleCreateStudentForm);
router.post('/students/:id', principalController.handleUpdateStudentForm);
router.get('/students/:id/delete', principalController.handleDeleteStudent);

module.exports = router;
