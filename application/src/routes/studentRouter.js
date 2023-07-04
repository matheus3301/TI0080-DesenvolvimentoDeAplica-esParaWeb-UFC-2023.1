const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.dashboardPage);
router.get('/classes', studentController.myClassesPage);
router.get('/classes/search', studentController.searchForClassesPage);
router.get('/classes/:id', studentController.viewClassPage);
router.get('/classes/:id/enroll', studentController.handleClassEnrollment);
router.get('/classes/:id/exit', studentController.handleClassExit);

module.exports = router;
