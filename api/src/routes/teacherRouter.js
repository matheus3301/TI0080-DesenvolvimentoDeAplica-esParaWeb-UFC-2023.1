const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.post('/', teacherController.createTeacher);
router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.getTeacherById);
router.put('/:id', teacherController.updateTeacherById);
router.delete('/:id', teacherController.deleteTeacherById);

module.exports = router;
